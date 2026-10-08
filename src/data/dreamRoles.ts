export type DreamRoleKey =
  | 'software-engineer'
  | 'frontend-developer'
  | 'backend-developer'
  | 'fullstack-developer'
  | 'ai-ml-engineer'
  | 'data-scientist'
  | 'cybersecurity-engineer'
  | 'cloud-devops-engineer'
  | 'mobile-app-developer'
  | 'other';

export interface DreamRoleOption {
  key: DreamRoleKey;
  label: string;
  description: string;
  icon: string;
}

export const dreamRoles: DreamRoleOption[] = [
  { key: 'software-engineer', label: 'Software Engineer', description: 'Broad software development across systems and applications', icon: 'TbCode' },
  { key: 'frontend-developer', label: 'Frontend Developer', description: 'Build beautiful, interactive user interfaces', icon: 'TbLayout' },
  { key: 'backend-developer', label: 'Backend Developer', description: 'Design APIs, databases, and server-side logic', icon: 'TbServer' },
  { key: 'fullstack-developer', label: 'Full Stack Developer', description: 'Master both frontend and backend development', icon: 'TbStack2' },
  { key: 'ai-ml-engineer', label: 'AI/ML Engineer', description: 'Build intelligent systems with machine learning', icon: 'TbBrain' },
  { key: 'data-scientist', label: 'Data Scientist', description: 'Extract insights from data with statistics and ML', icon: 'TbChartDots' },
  { key: 'cybersecurity-engineer', label: 'Cybersecurity Engineer', description: 'Protect systems from threats and vulnerabilities', icon: 'TbShieldLock' },
  { key: 'cloud-devops-engineer', label: 'Cloud/DevOps Engineer', description: 'Automate deployments and manage cloud infrastructure', icon: 'TbCloud' },
  { key: 'mobile-app-developer', label: 'Mobile App Developer', description: 'Build native and cross-platform mobile apps', icon: 'TbDeviceMobile' },
  { key: 'other', label: 'Other', description: 'Define your own custom career path', icon: 'TbStars' },
];

export function getDreamRoleLabel(key: string): string {
  return dreamRoles.find((r) => r.key === key)?.label || key;
}
