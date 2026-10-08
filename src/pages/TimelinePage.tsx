import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import { TbFlag } from 'react-icons/tb';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard, Button } from '@/components/ui';
import { EmptyState } from '@/components/States';
import { useApp } from '@/context/AppContext';

const phaseConfig = [
  { key: 'beginner', label: 'Beginner', color: 'emerald', gradient: 'from-emerald-400 to-teal-500' },
  { key: 'intermediate', label: 'Intermediate', color: 'cyan', gradient: 'from-cyan-400 to-blue-500' },
  { key: 'advanced', label: 'Advanced', color: 'amber', gradient: 'from-amber-400 to-orange-500' },
  { key: 'industry-ready', label: 'Industry Ready', color: 'rose', gradient: 'from-rose-400 to-pink-500' },
] as const;

export function TimelinePage() {
  const navigate = useNavigate();
  const { roadmap, isNodeComplete } = useApp();

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
        <Navbar />
        <div className="pt-20">
          <EmptyState
            icon={<TbFlag className="w-8 h-8" />}
            title="No Timeline Available"
            description="Generate a roadmap first to see your career timeline."
            action={<Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TbFlag className="w-7 h-7 text-cyan-500" /> Dynamic Timeline
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Visualize your journey from beginner to industry-ready.</p>
        </motion.div>

        <div className="space-y-6">
          {phaseConfig.map((phase, phaseIdx) => {
            const phaseNodes = roadmap.nodes.filter((n) => n.data.phase === phase.key);
            const completedInPhase = phaseNodes.filter((n) => isNodeComplete(n.id)).length;
            const pct = phaseNodes.length > 0 ? Math.round((completedInPhase / phaseNodes.length) * 100) : 0;

            return (
              <motion.div
                key={phase.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: phaseIdx * 0.15 }}
              >
                <GlassCard className="p-6 sm:p-8" hover>
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {phaseIdx + 1}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{phase.label}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {completedInPhase} of {phaseNodes.length} completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-500">{pct}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: phaseIdx * 0.15 }}
                      className={`h-full bg-gradient-to-r ${phase.gradient} rounded-full`}
                    />
                  </div>

                  {/* Milestones */}
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10" />
                    <div className="space-y-4">
                      {phaseNodes.map((node, i) => {
                        const done = isNodeComplete(node.id);
                        return (
                          <motion.div
                            key={node.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: phaseIdx * 0.15 + i * 0.08 }}
                            className="relative pl-10"
                          >
                            <div className={`absolute left-0 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
                              done
                                ? `bg-gradient-to-br ${phase.gradient} text-white`
                                : 'bg-white dark:bg-white/10 border-2 border-slate-200 dark:border-white/20 text-slate-300'
                            }`}>
                              {done ? <HiCheckCircle className="w-4 h-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                            </div>
                            <div className={`p-4 rounded-xl transition-all ${
                              done ? 'bg-emerald-50 dark:bg-emerald-500/5' : 'bg-slate-50 dark:bg-white/5'
                            }`}>
                              <div className="flex items-center justify-between gap-2">
                                <h3 className={`text-sm font-semibold ${done ? 'text-slate-400 dark:text-slate-500 line-through' : ''}`}>
                                  {node.data.label}
                                </h3>
                                <span className="text-xs text-slate-400 flex-shrink-0">{node.data.estimatedTime}</span>
                              </div>
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{node.data.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

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
