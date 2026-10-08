import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import { useApp } from '@/context/AppContext';
import type { RoadmapNodeData } from '@/types';

const phaseConfig = {
  beginner: {
    label: 'Beginner',
    bg: 'from-emerald-400/20 to-teal-500/20',
    border: 'border-emerald-400/40 dark:border-emerald-400/30',
    accent: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  intermediate: {
    label: 'Intermediate',
    bg: 'from-cyan-400/20 to-blue-500/20',
    border: 'border-cyan-400/40 dark:border-cyan-400/30',
    accent: 'text-cyan-600 dark:text-cyan-400',
    dot: 'bg-cyan-500',
  },
  advanced: {
    label: 'Advanced',
    bg: 'from-amber-400/20 to-orange-500/20',
    border: 'border-amber-400/40 dark:border-amber-400/30',
    accent: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  'industry-ready': {
    label: 'Industry Ready',
    bg: 'from-rose-400/20 to-pink-500/20',
    border: 'border-rose-400/40 dark:border-rose-400/30',
    accent: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
  },
};

function SkillNodeComponent({ id, data, selected }: NodeProps<RoadmapNodeData>) {
  const { isNodeComplete } = useApp();
  const completed = isNodeComplete(id);
  const config = phaseConfig[data.phase];

  return (
    <>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-white dark:!border-[#0a0e1a]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={`relative px-5 py-4 min-w-[180px] backdrop-blur-xl bg-gradient-to-br ${config.bg} border-2 ${config.border} rounded-2xl shadow-lg cursor-pointer transition-all ${
          selected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-transparent' : ''
        } ${completed ? 'ring-2 ring-emerald-400' : ''}`}
      >
        {completed && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <HiCheckCircle className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${config.accent}`}>
            {config.label}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
          {data.label}
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {data.description}
        </p>

        <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
          <span className={`px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/5 ${config.accent} font-medium`}>
            {data.estimatedTime}
          </span>
        </div>
      </motion.div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-white dark:!border-[#0a0e1a]" />
    </>
  );
}

export const SkillNode = memo(SkillNodeComponent);
