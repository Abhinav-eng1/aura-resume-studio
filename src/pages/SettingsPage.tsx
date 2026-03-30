import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon, User } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your preferences</p>

        <div className="space-y-4">
          {/* Profile */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <p className="text-foreground font-medium">{user?.name || '—'}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <p className="text-foreground font-medium">{user?.email || '—'}</p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <button
                onClick={toggle}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors"
              >
                {theme === 'light' ? <><Moon className="w-4 h-4" /> Dark</> : <><Sun className="w-4 h-4" /> Light</>}
              </button>
            </div>
          </div>

          {/* About */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-foreground mb-2">About</h2>
            <p className="text-sm text-muted-foreground">ResumeForge v1.0 — A modern resume builder built with React & TypeScript.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
