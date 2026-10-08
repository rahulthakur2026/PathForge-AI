import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiArrowRight, HiPlus, HiX, HiCheck } from 'react-icons/hi';
import { TbClock, TbBuilding, TbTarget } from 'react-icons/tb';
import * as TbIcons from 'react-icons/tb';
import { Navbar } from '@/components/Navbar';
import { GlassCard, Button } from '@/components/ui';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/States';
import { useApp } from '@/context/AppContext';
import { generateRoadmapApi } from '@/services/api';
import { dreamRoles, type DreamRoleKey } from '@/data/dreamRoles';

export function DashboardPage() {
  const navigate = useNavigate();
  const { roadmapInput, setRoadmapInput, setRoadmap } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    dreamRoleKey: (roadmapInput?.dreamRoleKey as DreamRoleKey) || '' as DreamRoleKey | '',
    dreamRole: roadmapInput?.dreamRole || '',
    company: roadmapInput?.company || '',
    timeline: roadmapInput?.timeline || '6 months',
    weeklyHours: roadmapInput?.weeklyHours || 20,
    currentSkills: roadmapInput?.currentSkills || [],
  });
  const [skillInput, setSkillInput] = useState('');

  const timelines = ['3 months', '6 months', '1 year', '2 years'];
  const hourOptions = [5, 10, 15, 20, 30, 40];

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.currentSkills.includes(trimmed)) {
      setForm({ ...form, currentSkills: [...form.currentSkills, trimmed] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, currentSkills: form.currentSkills.filter((s) => s !== skill) });
  };

  const selectRole = (key: DreamRoleKey, label: string) => {
    setForm({ ...form, dreamRoleKey: key, dreamRole: key === 'other' ? form.dreamRole : label });
  };

  const handleGenerate = async () => {
    if (!form.dreamRoleKey) {
      setError('Please select a dream role.');
      return;
    }
    if (form.dreamRoleKey === 'other' && !form.dreamRole.trim()) {
      setError('Please enter your custom dream role.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const input = {
        dreamRole: form.dreamRole,
        dreamRoleKey: form.dreamRoleKey,
        company: form.company,
        timeline: form.timeline,
        weeklyHours: form.weeklyHours,
        currentSkills: form.currentSkills,
      };
      setRoadmapInput(input);
      const roadmap = await generateRoadmapApi(input);
      setRoadmap(roadmap);
      navigate('/roadmap');
    } catch {
      setError('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a]">
        <Navbar />
        <div className="pt-20">
          <Loader text="AI is reverse-engineering your career path..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a]">
        <Navbar />
        <div className="pt-20">
          <ErrorState message={error} onRetry={handleGenerate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200/50 dark:border-cyan-500/20">
            <HiOutlineSparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Configure Your Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Build Your Career Roadmap</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Tell us about your goals and we'll forge a personalized path.</p>
        </motion.div>

        <GlassCard className="p-6 sm:p-8">
          <div className="space-y-6">
            {/* Dream Role Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                <TbTarget className="w-4 h-4 text-cyan-500" /> Dream Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {dreamRoles.map((role) => {
                  const selected = form.dreamRoleKey === role.key;
                  const IconComponent = (TbIcons as any)[role.icon] || TbIcons.TbStars;
                  return (
                    <motion.button
                      key={role.key}
                      whileHover={{ y: -2 }}
                      onClick={() => selectRole(role.key, role.label)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                        selected
                          ? 'border-cyan-400 bg-cyan-50/50 dark:bg-cyan-500/10 ring-2 ring-cyan-400/20'
                          : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      {selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center"
                        >
                          <HiCheck className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        selected ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold leading-tight ${selected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {role.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom role input when "Other" is selected */}
              {form.dreamRoleKey === 'other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    value={form.dreamRole}
                    onChange={(e) => setForm({ ...form, dreamRole: e.target.value })}
                    placeholder="Enter your custom dream role..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </motion.div>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <TbBuilding className="w-4 h-4 text-cyan-500" /> Target Company (Optional)
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Google, Amazon, Startup"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <TbClock className="w-4 h-4 text-cyan-500" /> Target Timeline
              </label>
              <div className="flex flex-wrap gap-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, timeline: t })}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      form.timeline === t
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Hours */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <TbClock className="w-4 h-4 text-cyan-500" /> Weekly Study Hours
              </label>
              <div className="flex flex-wrap gap-2">
                {hourOptions.map((h) => (
                  <button
                    key={h}
                    onClick={() => setForm({ ...form, weeklyHours: h })}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      form.weeklyHours === h
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {h}h/week
                  </button>
                ))}
              </div>
            </div>

            {/* Current Skills */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Current Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill and press Enter"
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <Button variant="secondary" onClick={addSkill}>
                  <HiPlus className="w-4 h-4" />
                </Button>
              </div>
              {form.currentSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.currentSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 rounded-lg border border-cyan-200/50 dark:border-cyan-500/20"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <HiX className="w-3.5 h-3.5" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button size="lg" onClick={handleGenerate} className="w-full">
                Generate Roadmap
                <HiArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
