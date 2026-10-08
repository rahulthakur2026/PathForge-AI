import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSwitchHorizontal, HiX } from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard, Button } from '@/components/ui';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/States';
import { compareCareersApi } from '@/services/api';
import type { CareerComparison } from '@/types';

const careerOptions = ['AI Engineer', 'Full Stack Developer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'UX Designer'];

export function ComparePage() {
  const [career1, setCareer1] = useState('AI Engineer');
  const [career2, setCareer2] = useState('Full Stack Developer');
  const [comparison, setComparison] = useState<CareerComparison | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await compareCareersApi(career1, career2);
      setComparison(result);
    } catch {
      setError('Failed to compare careers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="w-7 h-7 text-cyan-500" /> Career Comparison
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Compare two career paths side-by-side to make the best choice.</p>
        </motion.div>

        {/* Selection */}
        <GlassCard className="p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Career 1</label>
              <select
                value={career1}
                onChange={(e) => setCareer1(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400 transition-all"
              >
                {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Career 2</label>
              <select
                value={career2}
                onChange={(e) => setCareer2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400 transition-all"
              >
                {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Button onClick={handleCompare} disabled={loading} className="w-full">
            <HiOutlineSwitchHorizontal className="w-5 h-5" />
            {loading ? 'Comparing...' : 'Compare Careers'}
          </Button>
        </GlassCard>

        {loading && <Loader text="Analyzing career paths..." />}

        {error && <ErrorState message={error} onRetry={handleCompare} />}

        {comparison && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Salary Chart */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">Salary Growth Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparison.salaryGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="stage" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-slate-500" />
                  <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} className="text-slate-500" tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    formatter={(v: any) => `${Number(v).toLocaleString()}`}
                  />
                  <Legend />
                  <Bar dataKey="career1" name={comparison.career1} fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="career2" name={comparison.career2} fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Skills Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-base font-semibold mb-3 text-cyan-600 dark:text-cyan-400">{comparison.career1} Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {comparison.skills1.map((s) => (
                    <span key={s} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                      comparison.commonSkills.includes(s)
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20'
                        : 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-500/20'
                    }`}>{s}</span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-base font-semibold mb-3 text-blue-600 dark:text-blue-400">{comparison.career2} Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {comparison.skills2.map((s) => (
                    <span key={s} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                      comparison.commonSkills.includes(s)
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20'
                        : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20'
                    }`}>{s}</span>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Common vs Unique */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-base font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Common Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {comparison.commonSkills.map((s) => (
                    <span key={s} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20">{s}</span>
                  ))}
                </div>
              </GlassCard>

              <div className="space-y-4">
                <GlassCard className="p-5">
                  <h3 className="text-sm font-semibold mb-2 text-cyan-600 dark:text-cyan-400">Unique to {comparison.career1}</h3>
                  <div className="flex flex-wrap gap-2">
                    {comparison.uniqueSkills1.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">{s}</span>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-5">
                  <h3 className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">Unique to {comparison.career2}</h3>
                  <div className="flex flex-wrap gap-2">
                    {comparison.uniqueSkills2.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">{s}</span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Certifications & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-base font-semibold mb-3">Certifications</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{comparison.career1}</span>
                    <ul className="mt-2 space-y-1">
                      {comparison.certifications1.map((c, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400">• {c.name} — <span className="text-slate-400">{c.provider}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{comparison.career2}</span>
                    <ul className="mt-2 space-y-1">
                      {comparison.certifications2.map((c, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400">• {c.name} — <span className="text-slate-400">{c.provider}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-base font-semibold mb-3">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-50 dark:bg-cyan-500/10">
                    <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{comparison.career1}</span>
                    <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{comparison.timeline1}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{comparison.career2}</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{comparison.timeline2}</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
