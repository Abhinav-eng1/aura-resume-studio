import { motion } from 'framer-motion';
import { FileText, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Beautiful Templates', desc: 'Professional designs that stand out from the crowd.' },
  { icon: Zap, title: 'Live Preview', desc: 'See changes instantly as you type. No guessing needed.' },
  { icon: Shield, title: 'Easy to Use', desc: 'Intuitive interface designed for speed and simplicity.' },
];

export default function LandingPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button onClick={toggle} className="p-2.5 rounded-xl bg-card/80 backdrop-blur border border-border/50 text-foreground hover:bg-accent transition-colors">
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/60 text-accent-foreground text-sm font-medium mb-8 border border-border/50">
            <Sparkles className="w-4 h-4" />
            Build your professional resume in minutes
          </div>

          <h1 className="font-heading font-extrabold text-5xl md:text-7xl text-foreground leading-tight mb-6">
            Craft Resumes
            <br />
            <span className="text-primary">That Get Noticed</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            A modern resume builder with live preview, beautiful templates, and effortless PDF export.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-card text-foreground font-semibold text-base border border-border hover:bg-accent/50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-24"
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
