export type Phase = 'beginner' | 'intermediate' | 'advanced' | 'industry-ready';

export interface RoadmapNodeData {
  label: string;
  phase: Phase;
  description: string;
  objectives: string[];
  resources: { title: string; type: string; url: string }[];
  projects: { title: string; description: string; difficulty: string }[];
  interviewQuestions: string[];
  certifications: { name: string; provider: string }[];
  estimatedTime: string;
  skills: string[];
}

export interface RoadmapNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: RoadmapNodeData;
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  type?: string;
}

export interface Roadmap {
  career: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export interface RoadmapInput {
  dreamRole: string;
  dreamRoleKey?: string;
  company?: string;
  timeline: string;
  weeklyHours: number;
  currentSkills: string[];
}

export interface CareerPath {
  career: string;
  person: string;
  role: string;
  timeline: string;
  steps: { role: string; duration: string; description: string; projects: string[]; certifications: string[] }[];
}

export interface CareerComparison {
  career1: string;
  career2: string;
  skills1: string[];
  skills2: string[];
  commonSkills: string[];
  uniqueSkills1: string[];
  uniqueSkills2: string[];
  certifications1: { name: string; provider: string }[];
  certifications2: { name: string; provider: string }[];
  salaryGrowth: { stage: string; career1: number; career2: number }[];
  timeline1: string;
  timeline2: string;
}

export interface Progress {
  nodeId: string;
  completed: boolean;
  completedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export type Theme = 'dark' | 'light';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
