import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props {
  resume: ResumeData;
}

function ContactItem({ icon: Icon, value }: { icon: any; value: string }) {
  if (!value) return null;
  return <span className="flex items-center gap-1 text-xs"><Icon className="w-3 h-3" />{value}</span>;
}

function SectionTitle({ children, style }: { children: string; style: 'classic' | 'modern' | 'minimal' }) {
  if (style === 'modern') return <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">{children}</h3>;
  if (style === 'minimal') return <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{children}</h3>;
  return <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">{children}</h3>;
}

export default function ResumePreview({ resume }: Props) {
  const { personal, education, experience, skills, projects, certifications, templateId, sectionOrder } = resume;
  const style = templateId as 'classic' | 'modern' | 'minimal';

  const isEmpty = !personal.fullName && !personal.email && experience.length === 0 && education.length === 0;

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Start filling in your information to see the preview
      </div>
    );
  }

  const containerClass = style === 'modern'
    ? 'bg-white text-gray-800 p-8 font-[Inter,sans-serif] min-h-[297mm] w-[210mm] mx-auto shadow-sm'
    : style === 'minimal'
    ? 'bg-white text-gray-700 p-10 font-[Inter,sans-serif] min-h-[297mm] w-[210mm] mx-auto shadow-sm'
    : 'bg-white text-gray-800 p-8 font-[Inter,sans-serif] min-h-[297mm] w-[210mm] mx-auto shadow-sm';

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return personal.summary ? (
          <div key={key}>
            <SectionTitle style={style}>Summary</SectionTitle>
            <p className="text-xs leading-relaxed text-gray-600">{personal.summary}</p>
          </div>
        ) : null;

      case 'experience':
        return experience.length > 0 ? (
          <div key={key}>
            <SectionTitle style={style}>Experience</SectionTitle>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{exp.position}</p>
                      <p className="text-xs text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate || 'Present'}</p>
                  </div>
                  {exp.description && (
                    <div className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education.length > 0 ? (
          <div key={key}>
            <SectionTitle style={style}>Education</SectionTitle>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <p className="text-xs text-gray-600">{edu.institution}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return skills.length > 0 ? (
          <div key={key}>
            <SectionTitle style={style}>Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s} className={`text-xs px-2 py-0.5 rounded ${style === 'modern' ? 'bg-blue-50 text-blue-700' : style === 'minimal' ? 'bg-gray-100 text-gray-600' : 'bg-gray-100 text-gray-700'}`}>{s}</span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects.length > 0 ? (
          <div key={key}>
            <SectionTitle style={style}>Projects</SectionTitle>
            <div className="space-y-2">
              {projects.map(proj => (
                <div key={proj.id}>
                  <p className="text-xs font-semibold text-gray-800">{proj.name} {proj.technologies && <span className="font-normal text-gray-500">— {proj.technologies}</span>}</p>
                  {proj.description && <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>}
                  {proj.link && <p className="text-xs text-blue-600">{proj.link}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications.length > 0 ? (
          <div key={key}>
            <SectionTitle style={style}>Certifications</SectionTitle>
            <div className="space-y-1">
              {certifications.map(cert => (
                <div key={cert.id} className="flex justify-between">
                  <p className="text-xs"><span className="font-semibold text-gray-800">{cert.name}</span> — {cert.issuer}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default: return null;
    }
  };

  return (
    <div id="resume-preview" className={containerClass} style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
      {/* Header */}
      <div className={`mb-6 ${style === 'modern' ? 'text-center border-b-2 border-blue-600 pb-4' : style === 'minimal' ? 'mb-8' : 'border-b border-gray-300 pb-4'}`}>
        <h1 className={`font-bold ${style === 'modern' ? 'text-2xl text-blue-600' : style === 'minimal' ? 'text-xl tracking-wide' : 'text-xl'} text-gray-900`}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div className={`flex flex-wrap gap-3 mt-2 ${style === 'modern' ? 'justify-center' : ''} text-gray-500`}>
          <ContactItem icon={Mail} value={personal.email} />
          <ContactItem icon={Phone} value={personal.phone} />
          <ContactItem icon={MapPin} value={personal.location} />
          <ContactItem icon={Globe} value={personal.website} />
          <ContactItem icon={Linkedin} value={personal.linkedin} />
          <ContactItem icon={Github} value={personal.github} />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
