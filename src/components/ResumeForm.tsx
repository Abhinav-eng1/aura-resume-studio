import { useResume } from '@/context/ResumeContext';
import { Education, Experience, Project, Certification } from '@/types/resume';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function genId() { return crypto.randomUUID(); }

function SectionHeader({ title, onAdd, count }: { title: string; onAdd: () => void; count: number }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading font-semibold text-foreground">{title} {count > 0 && <span className="text-muted-foreground font-normal text-sm">({count})</span>}</h3>
      <button onClick={onAdd} className="text-sm text-primary hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
    </div>
  );
}

function FormField({ label, value, onChange, type = 'text', placeholder = '', multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; multiline?: boolean;
}) {
  const cls = "w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow";
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} className={cls + " min-h-[80px] resize-y"} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </div>
  );
}

export default function ResumeForm() {
  const { currentResume, updateResume } = useResume();
  const [openSection, setOpenSection] = useState<string | null>('personal');
  const [skillInput, setSkillInput] = useState('');

  if (!currentResume) return null;
  const { personal, education, experience, skills, projects, certifications } = currentResume;

  const update = (field: string, value: any) => updateResume({ [field]: value });
  const updatePersonal = (field: string, value: string) => update('personal', { ...personal, [field]: value });

  const toggleSection = (s: string) => setOpenSection(prev => prev === s ? null : s);

  const Section = ({ id, title, children, count = 0 }: { id: string; title: string; children: React.ReactNode; count?: number }) => (
    <div className="glass-card rounded-xl overflow-hidden">
      <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/30 transition-colors">
        <h3 className="font-heading font-semibold text-foreground text-sm">{title} {count > 0 && <span className="text-muted-foreground font-normal">({count})</span>}</h3>
        {openSection === id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {openSection === id && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const addEducation = () => update('education', [...education, { id: genId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }]);
  const updateEducation = (id: string, field: string, value: string) => update('education', education.map(e => e.id === id ? { ...e, [field]: value } : e));
  const removeEducation = (id: string) => update('education', education.filter(e => e.id !== id));

  const addExperience = () => update('experience', [...experience, { id: genId(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }]);
  const updateExperience = (id: string, field: string, value: any) => update('experience', experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  const removeExperience = (id: string) => update('experience', experience.filter(e => e.id !== id));

  const addProject = () => update('projects', [...projects, { id: genId(), name: '', description: '', technologies: '', link: '' }]);
  const updateProject = (id: string, field: string, value: string) => update('projects', projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  const removeProject = (id: string) => update('projects', projects.filter(p => p.id !== id));

  const addCert = () => update('certifications', [...certifications, { id: genId(), name: '', issuer: '', date: '', link: '' }]);
  const updateCert = (id: string, field: string, value: string) => update('certifications', certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  const removeCert = (id: string) => update('certifications', certifications.filter(c => c.id !== id));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) { update('skills', [...skills, s]); setSkillInput(''); }
  };
  const removeSkill = (s: string) => update('skills', skills.filter(sk => sk !== s));

  return (
    <div className="space-y-3 p-5 overflow-y-auto max-h-[calc(100vh-64px)]">
      {/* Resume title */}
      <div className="mb-2">
        <input
          value={currentResume.title}
          onChange={e => updateResume({ title: e.target.value })}
          className="font-heading font-bold text-xl text-foreground bg-transparent border-none outline-none w-full placeholder:text-muted-foreground"
          placeholder="Resume Title"
        />
      </div>

      <Section id="personal" title="Personal Information">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><FormField label="Full Name" value={personal.fullName} onChange={v => updatePersonal('fullName', v)} placeholder="John Doe" /></div>
          <FormField label="Email" value={personal.email} onChange={v => updatePersonal('email', v)} type="email" placeholder="john@example.com" />
          <FormField label="Phone" value={personal.phone} onChange={v => updatePersonal('phone', v)} placeholder="+1 234 567 890" />
          <FormField label="Location" value={personal.location} onChange={v => updatePersonal('location', v)} placeholder="New York, NY" />
          <FormField label="Website" value={personal.website} onChange={v => updatePersonal('website', v)} placeholder="yoursite.com" />
          <FormField label="LinkedIn" value={personal.linkedin} onChange={v => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/you" />
          <FormField label="GitHub" value={personal.github} onChange={v => updatePersonal('github', v)} placeholder="github.com/you" />
        </div>
        <FormField label="Professional Summary" value={personal.summary} onChange={v => updatePersonal('summary', v)} multiline placeholder="Brief summary of your experience..." />
      </Section>

      <Section id="experience" title="Experience" count={experience.length}>
        {experience.map((exp, i) => (
          <div key={exp.id} className="border border-border/50 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Experience {i + 1}</span>
              <button onClick={() => removeExperience(exp.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Position" value={exp.position} onChange={v => updateExperience(exp.id, 'position', v)} placeholder="Software Engineer" />
              <FormField label="Company" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} placeholder="Google" />
              <FormField label="Location" value={exp.location} onChange={v => updateExperience(exp.id, 'location', v)} placeholder="Remote" />
              <div className="flex gap-2">
                <FormField label="Start" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} placeholder="Jan 2023" />
                <FormField label="End" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} placeholder="Present" />
              </div>
            </div>
            <FormField label="Description" value={exp.description} onChange={v => updateExperience(exp.id, 'description', v)} multiline placeholder="• Led development of..." />
          </div>
        ))}
        <button onClick={addExperience} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </Section>

      <Section id="education" title="Education" count={education.length}>
        {education.map((edu, i) => (
          <div key={edu.id} className="border border-border/50 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Education {i + 1}</span>
              <button onClick={() => removeEducation(edu.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><FormField label="Institution" value={edu.institution} onChange={v => updateEducation(edu.id, 'institution', v)} placeholder="MIT" /></div>
              <FormField label="Degree" value={edu.degree} onChange={v => updateEducation(edu.id, 'degree', v)} placeholder="B.S." />
              <FormField label="Field" value={edu.field} onChange={v => updateEducation(edu.id, 'field', v)} placeholder="Computer Science" />
              <FormField label="Start" value={edu.startDate} onChange={v => updateEducation(edu.id, 'startDate', v)} placeholder="2019" />
              <FormField label="End" value={edu.endDate} onChange={v => updateEducation(edu.id, 'endDate', v)} placeholder="2023" />
              <FormField label="GPA" value={edu.gpa || ''} onChange={v => updateEducation(edu.id, 'gpa', v)} placeholder="3.8" />
            </div>
          </div>
        ))}
        <button onClick={addEducation} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </Section>

      <Section id="skills" title="Skills" count={skills.length}>
        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="flex-1 px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="Type a skill and press Enter"
          />
          <button onClick={addSkill} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s} className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              {s}
              <button onClick={() => removeSkill(s)} className="hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects" count={projects.length}>
        {projects.map((proj, i) => (
          <div key={proj.id} className="border border-border/50 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Project {i + 1}</span>
              <button onClick={() => removeProject(proj.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <FormField label="Name" value={proj.name} onChange={v => updateProject(proj.id, 'name', v)} placeholder="My Project" />
            <FormField label="Technologies" value={proj.technologies} onChange={v => updateProject(proj.id, 'technologies', v)} placeholder="React, TypeScript" />
            <FormField label="Link" value={proj.link} onChange={v => updateProject(proj.id, 'link', v)} placeholder="github.com/..." />
            <FormField label="Description" value={proj.description} onChange={v => updateProject(proj.id, 'description', v)} multiline placeholder="Built a..." />
          </div>
        ))}
        <button onClick={addProject} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </Section>

      <Section id="certifications" title="Certifications" count={certifications.length}>
        {certifications.map((cert, i) => (
          <div key={cert.id} className="border border-border/50 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Certification {i + 1}</span>
              <button onClick={() => removeCert(cert.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Name" value={cert.name} onChange={v => updateCert(cert.id, 'name', v)} placeholder="AWS Certified" />
              <FormField label="Issuer" value={cert.issuer} onChange={v => updateCert(cert.id, 'issuer', v)} placeholder="Amazon" />
              <FormField label="Date" value={cert.date} onChange={v => updateCert(cert.id, 'date', v)} placeholder="2023" />
              <FormField label="Link" value={cert.link} onChange={v => updateCert(cert.id, 'link', v)} placeholder="credential URL" />
            </div>
          </div>
        ))}
        <button onClick={addCert} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </Section>
    </div>
  );
}
