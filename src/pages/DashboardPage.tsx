import { useResume } from '@/context/ResumeContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FilePlus, FileText, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { resumes, createResume, setCurrentResume } = useResume();
  const navigate = useNavigate();

  const handleCreate = () => {
    const r = createResume();
    setCurrentResume(r);
    navigate('/create');
  };

  const recentResumes = resumes.slice(0, 3);

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-muted-foreground mb-8">Manage and create your professional resumes</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: FileText, label: 'Total Resumes', value: resumes.length },
            { icon: Clock, label: 'Last Updated', value: resumes.length ? new Date(resumes[0].updatedAt).toLocaleDateString() : '—' },
            { icon: TrendingUp, label: 'Templates Used', value: new Set(resumes.map(r => r.templateId)).size || 0 },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-heading font-bold text-xl text-foreground">{String(value)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <button
          onClick={handleCreate}
          className="glass-card rounded-2xl p-6 flex items-center gap-4 w-full hover:shadow-md transition-shadow group mb-10 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <FilePlus className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="font-heading font-semibold text-foreground">Create New Resume</p>
            <p className="text-sm text-muted-foreground">Start with a blank template and build your resume</p>
          </div>
        </button>

        {/* Recent */}
        {recentResumes.length > 0 && (
          <>
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Resumes</h2>
            <div className="grid gap-3">
              {recentResumes.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setCurrentResume(r); navigate('/create'); }}
                  className="glass-card rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{r.title || 'Untitled'}</p>
                      <p className="text-xs text-muted-foreground">Updated {new Date(r.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full capitalize">{r.templateId}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
