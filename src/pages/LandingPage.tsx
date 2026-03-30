import { motion } from 'framer-motion';
import { FileText, ArrowRight, Sparkles, Shield, Zap, Eye, Download, Palette, CheckCircle, Star, ChevronRight, Menu, X, Sun, Moon, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

const features = [
  { icon: Sparkles, title: 'Beautiful Templates', desc: 'Choose from multiple professionally designed templates that make your resume stand out to recruiters.' },
  { icon: Eye, title: 'Live Preview', desc: 'See every change reflected instantly as you type. No more guessing how your resume will look.' },
  { icon: Download, title: 'PDF Export', desc: 'Download your polished resume as a high-quality PDF, ready to submit to any employer.' },
  { icon: Palette, title: 'Template Switching', desc: 'Seamlessly switch between templates with smooth animations. Find the perfect style for you.' },
  { icon: Shield, title: 'Auto-Save', desc: 'Never lose your progress. Every edit is automatically saved with a visual confirmation.' },
  { icon: Zap, title: 'Fast & Intuitive', desc: 'Built for speed and simplicity. Create a professional resume in under 10 minutes.' },
];

const steps = [
  { step: '01', title: 'Create Account', desc: 'Sign up in seconds with just your name and email. No credit card required.' },
  { step: '02', title: 'Fill Your Details', desc: 'Add your experience, education, skills, and projects using our intuitive form builder.' },
  { step: '03', title: 'Choose a Template', desc: 'Pick from Classic, Modern, or Minimal templates and preview your resume in real-time.' },
  { step: '04', title: 'Download & Apply', desc: 'Export your finished resume as a PDF and start applying to your dream jobs.' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Software Engineer', text: 'ResumeForge helped me land my dream job at a top tech company. The templates are clean and professional.', rating: 5 },
  { name: 'Michael Rodriguez', role: 'Product Manager', text: 'The live preview feature is a game changer. I could see exactly how my resume looked while editing.', rating: 5 },
  { name: 'Emily Watson', role: 'UX Designer', text: 'Simple, elegant, and effective. I created a beautiful resume in less than 15 minutes.', rating: 5 },
];

const stats = [
  { value: '10K+', label: 'Resumes Created' },
  { value: '95%', label: 'User Satisfaction' },
  { value: '3', label: 'Pro Templates' },
  { value: '< 10min', label: 'Average Build Time' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  const { theme, toggle } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent/30 blur-3xl animate-float" style={{ animationDelay: '5s' }} />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">ResumeForge</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => scrollTo('testimonials')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-3">
              <button onClick={() => scrollTo('features')} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground">Features</button>
              <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground">How It Works</button>
              <button onClick={() => scrollTo('testimonials')} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground">Testimonials</button>
              <div className="flex gap-3 pt-2">
                <Link to="/login" className="flex-1 text-center px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-accent transition-colors">Sign In</Link>
                <Link to="/signup" className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
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

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A modern resume builder with live preview, beautiful templates, and effortless PDF export. Stand out from the crowd and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => scrollTo('features')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-card text-foreground font-semibold text-base border border-border hover:bg-accent/50 transition-colors"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-2xl md:text-3xl text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="relative z-10 px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3 mb-4">Everything You Need to Build a Perfect Resume</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Packed with powerful features designed to make resume building effortless and enjoyable.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-accent-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 md:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3 mb-4">Four Simple Steps to Your Dream Resume</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Getting started is easy. Follow these simple steps and have your resume ready in minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 flex gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-xl text-primary">{step}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEMPLATES PREVIEW ─── */}
      <section className="relative z-10 px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Templates</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3 mb-4">Professional Templates for Every Style</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Choose the design that best fits your industry and personal brand.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Classic', desc: 'Traditional and elegant. Perfect for corporate roles and formal industries.', color: 'bg-muted' },
              { name: 'Modern', desc: 'Bold with accent colors. Great for tech, startups, and creative fields.', color: 'bg-primary/5' },
              { name: 'Minimal', desc: 'Clean and spacious. Ideal for designers, writers, and consultants.', color: 'bg-accent/30' },
            ].map(({ name, desc, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className={`h-48 ${color} flex items-center justify-center`}>
                  <div className="w-24 h-32 bg-card rounded-lg shadow-sm border border-border/50 flex flex-col items-center justify-center gap-2 p-3">
                    <div className="w-8 h-1.5 bg-foreground/20 rounded-full" />
                    <div className="w-full h-1 bg-foreground/10 rounded-full" />
                    <div className="w-full h-1 bg-foreground/10 rounded-full" />
                    <div className="w-3/4 h-1 bg-foreground/10 rounded-full" />
                    <div className="w-full h-1 bg-foreground/10 rounded-full mt-2" />
                    <div className="w-full h-1 bg-foreground/10 rounded-full" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Try All Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="relative z-10 px-6 py-20 md:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-3 mb-4">Loved by Job Seekers Everywhere</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">See what our users have to say about their experience with ResumeForge.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent-foreground">{name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 px-6 py-20 md:py-28">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-10 md:p-16 border border-primary/20"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Join thousands of professionals who've already created stunning resumes with ResumeForge. It's free, fast, and easy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Create Your Resume Now
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
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold text-foreground">ResumeForge</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A modern resume builder that helps you create professional, eye-catching resumes in minutes.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li><button onClick={() => scrollTo('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</button></li>
                <li><button onClick={() => scrollTo('how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</button></li>
                <li><Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</Link></li>
                <li><button onClick={() => scrollTo('testimonials')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-muted-foreground">About Us</span></li>
                <li><span className="text-sm text-muted-foreground">Careers</span></li>
                <li><span className="text-sm text-muted-foreground">Blog</span></li>
                <li><span className="text-sm text-muted-foreground">Contact</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-muted-foreground">Privacy Policy</span></li>
                <li><span className="text-sm text-muted-foreground">Terms of Service</span></li>
                <li><span className="text-sm text-muted-foreground">Cookie Policy</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ResumeForge. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Built with ❤️ using React & TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
