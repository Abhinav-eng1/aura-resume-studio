import { useResume } from '@/context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Trash2, Copy, Edit, Plus } from 'lucide-react';

export default function MyResumesPage() {
  const { resumes, setCurrentResume, deleteResume, duplicateResume, createResume } = useResume();
  const navigate = useNavigate();

  const handleCreate = () => { const r = createResume(); setCurrentResume(r); navigate('/create'); };
  const handleEdit = (id: string) => { const r = resumes.find(x => x.id === id); if (r) { setCurrentResume(r); navigate('/create'); } };

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">My Resumes</h1>
            <p className="text-muted-foreground text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> New Resume
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No resumes yet</p>
            <p className="text-sm text-muted-foreground mb-6">Create your first resume to get started</p>
            <button onClick={handleCreate} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {resumes.map(r => (
              <div key={r.id} className="glass-card rounded-xl p-5 flex items-center justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{r.title || 'Untitled'}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.personal.fullName || 'No name'} • Updated {new Date(r.updatedAt).toLocaleDateString()} • <span className="capitalize">{r.templateId}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(r.id)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => duplicateResume(r.id)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteResume(r.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
