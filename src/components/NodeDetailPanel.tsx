import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheckCircle, HiClock, HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import type { RoadmapNodeData, Phase } from '@/types';

const phaseConfig: Record<Phase, { label: string; color: string; bg: string }> = {
  beginner: { label: 'Beginner', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
  intermediate: { label: 'Intermediate', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10' },
  advanced: { label: 'Advanced', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  'industry-ready': { label: 'Industry Ready', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
};

export function NodeDetailPanel({
  nodeId,
  data,
  onClose,
}: {
  nodeId: string;
  data: RoadmapNodeData;
  onClose: () => void;
}) {
  const { isNodeComplete, toggleNodeComplete } = useApp();
  const completed = isNodeComplete(nodeId);
  const config = phaseConfig[data.phase];

  const sections = [
    { icon: <HiOutlineBookOpen className="w-4 h-4" />, title: 'Learning Objectives', items: data.objectives },
    { icon: <HiOutlineClipboardList className="w-4 h-4" />, title: 'Resources', items: data.resources.map((r) => `${r.title} (${r.type})`) },
    { icon: <HiOutlineBriefcase className="w-4 h-4" />, title: 'Recommended Projects', items: data.projects.map((p) => `${p.title} — ${p.description} [${p.difficulty}]`) },
    { icon: <HiOutlineQuestionMarkCircle className="w-4 h-4" />, title: 'Interview Questions', items: data.interviewQuestions },
    { icon: <HiOutlineAcademicCap className="w-4 h-4" />, title: 'Certifications', items: data.certifications.map((c) => `${c.name} — ${c.provider}`) },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-16 bottom-0 w-full sm:w-[480px] z-40 backdrop-blur-2xl bg-white/90 dark:bg-[#0a0e1a]/95 border-l border-slate-200/50 dark:border-white/10 overflow-y-auto"
      >
        <div className="sticky top-0 backdrop-blur-2xl bg-white/80 dark:bg-[#0a0e1a]/80 border-b border-slate-200/50 dark:border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
            {config.label}
          </span>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{data.label}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{data.description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <HiClock className="w-4 h-4 text-cyan-500" />
            <span>Estimated completion: <strong className="text-slate-700 dark:text-slate-200">{data.estimatedTime}</strong></span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg">
                {skill}
              </span>
            ))}
          </div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-3">
                <span className="text-cyan-500">{section.icon}</span>
                {section.title}
              </h3>
              <ul className="space-y-2 ml-6">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                    <span className="text-cyan-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Mark Complete */}
          <div className="pt-4 sticky bottom-0 backdrop-blur-xl bg-white/80 dark:bg-[#0a0e1a]/80 border-t border-slate-200/50 dark:border-white/10 -mx-6 -mb-6 px-6 py-4">
            <Button
              variant={completed ? 'secondary' : 'primary'}
              size="lg"
              onClick={() => toggleNodeComplete(nodeId)}
              className="w-full"
            >
              <HiCheckCircle className="w-5 h-5" />
              {completed ? 'Marked Complete — Click to Undo' : 'Mark as Complete'}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
