import { useResume } from '@/context/ResumeContext';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { motion } from 'framer-motion';
import { Check, Loader2, Download, Layout } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

export default function CreateResumePage() {
  const { currentResume, createResume, updateResume, saveStatus } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentResume) createResume();
  }, []);

  if (!currentResume) return null;

  const handleExport = () => {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>${currentResume.title || 'Resume'}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style></head>
      <body>${el.outerHTML.replace(/style="[^"]*transform[^"]*"/, '')}</body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="no-print flex items-center justify-between px-5 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-semibold text-foreground text-sm">{currentResume.title || 'Untitled'}</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Template selector */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => updateResume({ templateId: t.id })}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  currentResume.templateId === t.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-border/50 overflow-y-auto bg-background">
          <ResumeForm />
        </div>
        <div className="w-1/2 bg-muted/30 overflow-y-auto p-6">
          <motion.div
            key={currentResume.templateId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ResumePreview resume={currentResume} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
