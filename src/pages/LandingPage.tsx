import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiSparkles,
  HiArrowRight,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCog,
} from 'react-icons/hi';
import {
  TbNetwork,
  TbBrain,
  TbTrendingUp,
  TbGitCompare,
  TbUsers,
  TbDownload,
} from 'react-icons/tb';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { featureShowcase } from '@/data/mockData';
import { dreamRoles, type DreamRoleKey } from '@/data/dreamRoles';

const iconMap: Record<string, React.ReactNode> = {
  Network: <TbNetwork className="w-6 h-6" />,
  Brain: <TbBrain className="w-6 h-6" />,
  TrendingUp: <TbTrendingUp className="w-6 h-6" />,
  GitCompare: <TbGitCompare className="w-6 h-6" />,
  Users: <TbUsers className="w-6 h-6" />,
  Download: <TbDownload className="w-6 h-6" />,
};

export function LandingPage() {
  const navigate = useNavigate();
  const { setRoadmapInput } = useApp();
  const [selectedRole, setSelectedRole] = useState<DreamRoleKey | ''>('');

  const handleGenerate = () => {
    const role = dreamRoles.find((r) => r.key === selectedRole);
    setRoadmapInput({
      dreamRole: role ? role.label : 'AI/ML Engineer',
      dreamRoleKey: role ? role.key : 'ai-ml-engineer',
      timeline: '6 months',
      weeklyHours: 20,
      currentSkills: [],
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200/50 dark:border-cyan-500/20"
            >
              <HiSparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AI-Powered Career Roadmapping</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Reverse-Engineer Your{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Dream Career
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              PathForge AI analyzes the paths of top professionals and builds a personalized, interactive roadmap to get you from where you are to where you want to be.
            </motion.p>

            {/* Dream Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-2 backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-lg">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <HiOutlineLightBulb className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as DreamRoleKey)}
                    className="flex-1 bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-white py-3 cursor-pointer [&>option]:text-slate-900 [&>option]:dark:text-white [&>option]:bg-white [&>option]:dark:bg-[#0a0e1a]"
                  >
                    <option value="">Select your dream role...</option>
                    {dreamRoles.map((role) => (
                      <option key={role.key} value={role.key}>{role.label}</option>
                    ))}
                  </select>
                </div>
                <Button size="lg" onClick={handleGenerate} className="flex-shrink-0">
                  Generate Roadmap
                  <HiArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                Choose from Software Engineer, Frontend, Backend, Full Stack, AI/ML, Data Science, Cybersecurity, Cloud/DevOps, Mobile, and more
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Careers Mapped' },
              { value: '500+', label: 'Skill Nodes' },
              { value: '50+', label: 'Career Paths' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold"
            >
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Forge Your Path
              </span>
            </motion.h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit that turns career aspirations into actionable, step-by-step roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureShowcase.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-2xl hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', icon: <HiOutlineLightBulb className="w-8 h-8" />, title: 'Enter Your Dream Role', desc: 'Tell us your career goal, target company, and timeline.' },
              { step: '02', icon: <HiOutlineCog className="w-8 h-8" />, title: 'AI Builds Your Roadmap', desc: 'Our engine reverse-engineers the path from successful professionals.' },
              { step: '03', icon: <HiOutlineChartBar className="w-8 h-8" />, title: 'Track & Achieve', desc: 'Follow your interactive roadmap, mark progress, and reach your goal.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white mb-6">
                  {item.icon}
                  <span className="absolute -top-2 -right-2 text-xs font-bold bg-white dark:bg-[#0a0e1a] text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-12 text-center text-white"
          >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Forge Your Path?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join thousands of professionals who turned their career dreams into reality with PathForge AI.
              </p>
              <Button
                size="lg"
                onClick={handleGenerate}
                className="bg-white text-cyan-600 hover:bg-white/90 hover:shadow-xl"
              >
                Start Forging <HiArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
