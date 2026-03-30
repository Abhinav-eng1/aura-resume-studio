import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  setCurrentResume: (resume: ResumeData | null) => void;
  updateResume: (data: Partial<ResumeData>) => void;
  createResume: () => ResumeData;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => ResumeData | null;
  saveStatus: 'saved' | 'saving' | 'unsaved';
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be within ResumeProvider');
  return ctx;
}

function loadResumes(): ResumeData[] {
  try {
    const data = localStorage.getItem('resumes');
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveResumes(resumes: ResumeData[]) {
  localStorage.setItem('resumes', JSON.stringify(resumes));
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumes, setResumes] = useState<ResumeData[]>(loadResumes);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { saveResumes(resumes); }, [resumes]);

  const updateResume = useCallback((data: Partial<ResumeData>) => {
    if (!currentResume) return;
    setSaveStatus('unsaved');
    const updated = { ...currentResume, ...data, updatedAt: new Date().toISOString() };
    setCurrentResume(updated);
    
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveStatus('saving');
      setResumes(prev => prev.map(r => r.id === updated.id ? updated : r));
      setTimeout(() => setSaveStatus('saved'), 500);
    }, 800);
  }, [currentResume]);

  const createResume = useCallback(() => {
    const now = new Date().toISOString();
    const resume: ResumeData = {
      ...defaultResumeData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setResumes(prev => [resume, ...prev]);
    setCurrentResume(resume);
    return resume;
  }, []);

  const deleteResume = useCallback((id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    if (currentResume?.id === id) setCurrentResume(null);
  }, [currentResume]);

  const duplicateResume = useCallback((id: string) => {
    const original = resumes.find(r => r.id === id);
    if (!original) return null;
    const now = new Date().toISOString();
    const dup: ResumeData = { ...original, id: crypto.randomUUID(), title: `${original.title} (Copy)`, createdAt: now, updatedAt: now };
    setResumes(prev => [dup, ...prev]);
    return dup;
  }, [resumes]);

  return (
    <ResumeContext.Provider value={{ resumes, currentResume, setCurrentResume, updateResume, createResume, deleteResume, duplicateResume, saveStatus }}>
      {children}
    </ResumeContext.Provider>
  );
}
