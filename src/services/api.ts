import type {
  Roadmap,
  RoadmapInput,
  RoadmapNodeData,
  CareerComparison,
  Progress,
  Badge,
} from '@/types';
import { generateRoadmap } from '@/data/mockRoadmap';
import { mockCareerPaths, mockComparison, mockBadges } from '@/data/mockData';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateRoadmapApi(input: RoadmapInput): Promise<Roadmap> {
  await delay(1500);
  return generateRoadmap(input);
}

export async function getNodeDetailsApi(nodeId: string, roadmap: Roadmap): Promise<RoadmapNodeData> {
  await delay(500);
  const node = roadmap.nodes.find((n) => n.id === nodeId);
  if (!node) throw new Error('Node not found');
  return node.data;
}

export async function compareCareersApi(career1: string, career2: string): Promise<CareerComparison> {
  await delay(1200);
  return { ...mockComparison, career1, career2 };
}

export async function exportRoadmapApi(format: 'pdf' | 'image', roadmap: Roadmap): Promise<{ url: string }> {
  await delay(1000);
  return { url: `mock-export-${format}-${Date.now()}` };
}

export async function getProgressApi(): Promise<{ progress: Progress[]; badges: Badge[] }> {
  await delay(500);
  return { progress: [], badges: mockBadges };
}

export { mockCareerPaths, mockBadges };
