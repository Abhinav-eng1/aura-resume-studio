export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  id: string;
  title: string;
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  templateId: string;
  sectionOrder: string[];
  updatedAt: string;
  createdAt: string;
}

export const defaultResumeData: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Untitled Resume',
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  templateId: 'classic',
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
};
