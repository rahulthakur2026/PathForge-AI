import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiStar, HiArrowRight } from 'react-icons/hi';
import * as HiIcons from 'react-icons/hi';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard, Button } from '@/components/ui';
import { EmptyState } from '@/components/States';
import { useApp } from '@/context/AppContext';
import { mockBadges } from '@/data/mockData';

export function ProgressPage() {
  const navigate = useNavigate();
  const { roadmap, progress, isNodeComplete, toggleNodeComplete, progressPercentage } = useApp();

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
        <Navbar />
        <div className="pt-20">
          <EmptyState
            title="No Roadmap to Track"
            description="Generate a roadmap first to start tracking your progress."
            action={<Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
          />
        </div>
      </div>
    );
  }

  const completedCount = roadmap.nodes.filter((n) => isNodeComplete(n.id)).length;
  const phaseStats = ['beginner', 'intermediate', 'advanced', 'industry-ready'].map((phase) => {
    const phaseNodes = roadmap.nodes.filter((n) => n.data.phase === phase);
    const completed = phaseNodes.filter((n) => isNodeComplete(n.id)).length;
    return { phase, total: phaseNodes.length, completed };
  });

  // Determine earned badges
  const earnedBadges = mockBadges.map((badge) => {
    let earned = false;
    if (badge.id === 'b1') earned = completedCount >= 1;
    if (badge.id === 'b2') earned = phaseStats[0].completed === phaseStats[0].total && phaseStats[0].total > 0;
    if (badge.id === 'b3') earned = completedCount >= 5;
    if (badge.id === 'b4') earned = progressPercentage >= 50;
    if (badge.id === 'b5') earned = phaseStats[2].completed === phaseStats[2].total && phaseStats[2].total > 0;
    if (badge.id === 'b6') earned = progressPercentage === 100;
    return { ...badge, earned };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Track your milestones, earn badges, and see your journey unfold.</p>
        </motion.div>

        {/* Completion Meter */}
        <GlassCard className="p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="64" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-200 dark:text-white/10" />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="64"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={402}
                  initial={{ strokeDashoffset: 402 }}
                  animate={{ strokeDashoffset: 402 - (402 * progressPercentage) / 100 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{progressPercentage}%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Complete</span>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                  <div className="text-2xl font-bold text-cyan-500">{completedCount}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Milestones Done</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                  <div className="text-2xl font-bold text-blue-500">{roadmap.nodes.length - completedCount}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Remaining</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                  <div className="text-2xl font-bold text-amber-500">{earnedBadges.filter((b) => b.earned).length}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Badges Earned</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                  <div className="text-2xl font-bold text-emerald-500">{roadmap.nodes.length}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Total Milestones</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Phase Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {phaseStats.map((stat, i) => {
            const pct = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
            const colors = ['emerald', 'cyan', 'amber', 'rose'];
            const color = colors[i];
            return (
              <GlassCard key={i} className="p-5" hover>
                <div className={`text-sm font-semibold capitalize mb-3 text-${color}-600 dark:text-${color}-400`}>
                  {stat.phase.replace('-', ' ')}
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-bold">{stat.completed}/{stat.total}</span>
                  <span className="text-sm text-slate-500">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className={`h-full bg-${color}-500 rounded-full`}
                  />
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Milestones List */}
        <GlassCard className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Milestones</h2>
          <div className="space-y-2">
            {roadmap.nodes.map((node) => {
              const done = isNodeComplete(node.id);
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    done ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                  onClick={() => toggleNodeComplete(node.id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 dark:border-white/20'
                  }`}>
                    {done && <HiCheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-medium ${done ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                      {node.data.label}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 capitalize">{node.data.phase.replace('-', ' ')}</span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard className="p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <HiStar className="w-5 h-5 text-amber-500" /> Achievement Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {earnedBadges.map((badge, i) => {
              const IconComponent = (HiIcons as any)[badge.icon] || HiStar;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all ${
                    badge.earned
                      ? 'bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-amber-400/30'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    badge.earned ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold ${badge.earned ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    {badge.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">{badge.description}</span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/roadmap')}>
            Back to Roadmap <HiArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
