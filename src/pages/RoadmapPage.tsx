import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeTypes,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
} from 'reactflow';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineChartBar, HiOutlineDownload } from 'react-icons/hi';
import { TbRoute } from 'react-icons/tb';
import 'reactflow/dist/style.css';
import { Navbar } from '@/components/Navbar';
import { SkillNode } from '@/components/SkillNode';
import { NodeDetailPanel } from '@/components/NodeDetailPanel';
import { EmptyState } from '@/components/States';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import type { RoadmapNodeData } from '@/types';

const nodeTypes: NodeTypes = { skillNode: SkillNode };

const phaseColors: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#06b6d4',
  advanced: '#f59e0b',
  'industry-ready': '#f43f5e',
};

export function RoadmapPage() {
  const navigate = useNavigate();
  const { roadmap, isNodeComplete, progressPercentage } = useApp();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = useMemo<Node<RoadmapNodeData>[]>(() => {
    if (!roadmap) return [];
    return roadmap.nodes as Node<RoadmapNodeData>[];
  }, [roadmap]);

  const edges = useMemo<Edge[]>(() => {
    if (!roadmap) return [];
    return roadmap.edges.map((e) => ({
      ...e,
      style: { stroke: '#06b6d4', strokeWidth: 2 },
    }));
  }, [roadmap]);

  const [rfNodes, setRfNodes] = useState<Node[]>(nodes);
  const [rfEdges, setRfEdges] = useState<Edge[]>(edges);

  // Sync when roadmap changes
  useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges]);

  const onNodesChange = useCallback((changes: any) => setRfNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setRfEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((conn: any) => setRfEdges((eds) => addEdge(conn, eds)), []);

  const onNodeClick = useCallback((_: any, node: Node<RoadmapNodeData>) => {
    setSelectedNode(node.id);
  }, []);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
        <Navbar />
        <div className="pt-20">
          <EmptyState
            icon={<TbRoute className="w-8 h-8" />}
            title="No Roadmap Generated Yet"
            description="Head to the dashboard, enter your dream career, and generate a personalized roadmap."
            action={<Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
          />
        </div>
      </div>
    );
  }

  const selectedData = roadmap.nodes.find((n) => n.id === selectedNode)?.data;
  const completedCount = roadmap.nodes.filter((n) => isNodeComplete(n.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      {/* Header Bar */}
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-4 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <TbRoute className="w-6 h-6 text-cyan-500" />
              {roadmap.career} Roadmap
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {completedCount} of {roadmap.nodes.length} milestones completed
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress bar */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
              <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{progressPercentage}%</span>
            </div>

            <Button variant="secondary" size="sm" onClick={() => navigate('/progress')}>
              <HiOutlineChartBar className="w-4 h-4" /> Progress
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/timeline')}>
              <HiOutlineEye className="w-4 h-4" /> Timeline
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/export')}>
              <HiOutlineDownload className="w-4 h-4" /> Export
            </Button>
          </div>
        </div>

        {/* Phase Legend */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 pb-3">
          {Object.entries(phaseColors).map(([phase, color]) => (
            <div key={phase} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="text-xs font-medium capitalize text-slate-500 dark:text-slate-400">{phase.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="h-[calc(100vh-220px)] w-full relative">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#06b6d4', strokeWidth: 2 },
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#94a3b8" />
          <Controls className="!bg-white/80 dark:!bg-white/5 !border-slate-200/50 dark:!border-white/10 !backdrop-blur-xl" />
          <MiniMap
            nodeColor={(node) => phaseColors[(node.data as RoadmapNodeData)?.phase] || '#06b6d4'}
            className="!bg-white/80 dark:!bg-white/5 !border-slate-200/50 dark:!border-white/10 !backdrop-blur-xl"
          />
        </ReactFlow>
      </div>

      {/* Node Detail Panel */}
      {selectedNode && selectedData && (
        <NodeDetailPanel
          nodeId={selectedNode}
          data={selectedData}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
