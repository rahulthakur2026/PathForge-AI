import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiBriefcase, HiAcademicCap, HiClock } from 'react-icons/hi';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/ui';
import { Loader } from '@/components/Loader';
import { mockCareerPaths } from '@/data/mockData';

export function PathsPage() {
  const [loading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a]">
        <Navbar />
        <div className="pt-20"><Loader text="Loading career journeys..." /></div>
      </div>
    );
  }

  const person = mockCareerPaths[selectedPerson];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HiOutlineUsers className="w-7 h-7 text-cyan-500" /> People Who Took This Path
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Real career journeys from professionals who reached their dream roles.</p>
        </motion.div>

        {/* Person Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {mockCareerPaths.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPerson(i)}
              className={`text-left p-5 rounded-2xl border transition-all ${
                selectedPerson === i
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-400/40 ring-2 ring-cyan-400/20'
                  : 'bg-white/60 dark:bg-white/5 border-slate-200/50 dark:border-white/10 hover:border-cyan-400/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {p.person.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{p.person}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{p.role}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                <HiClock className="w-3.5 h-3.5" /> {p.timeline}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <GlassCard className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">{person.person}'s Journey</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{person.role} — {person.timeline} total</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600" />

            <div className="space-y-8">
              {person.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Node */}
                  <div className="absolute left-0 sm:left-2 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
                    {i + 1}
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <HiBriefcase className="w-4 h-4 text-cyan-500" /> {step.role}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{step.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <HiBriefcase className="w-3.5 h-3.5 text-cyan-500" /> Projects
                        </h4>
                        <ul className="space-y-1">
                          {step.projects.map((proj, j) => (
                            <li key={j} className="text-xs text-slate-600 dark:text-slate-400 flex gap-1.5">
                              <span className="text-cyan-400">•</span> {proj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <HiAcademicCap className="w-3.5 h-3.5 text-cyan-500" /> Certifications
                        </h4>
                        <ul className="space-y-1">
                          {step.certifications.map((cert, j) => (
                            <li key={j} className="text-xs text-slate-600 dark:text-slate-400 flex gap-1.5">
                              <span className="text-cyan-400">•</span> {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <Footer />
    </div>
  );
}
