import type { CareerPath, CareerComparison, Badge } from '@/types';

export const mockCareerPaths: CareerPath[] = [
  {
    career: 'AI Engineer',
    person: 'Sarah Chen',
    role: 'Senior AI Engineer at Google',
    timeline: '4 years',
    steps: [
      {
        role: 'Junior Developer',
        duration: '6 months',
        description: 'Started as a frontend developer building UI components',
        projects: ['Portfolio website', 'Task management app'],
        certifications: ['JavaScript Associate'],
      },
      {
        role: 'ML Enthusiast',
        duration: '1 year',
        description: 'Self-taught ML through online courses and Kaggle competitions',
        projects: ['Image classifier', 'Sentiment analysis model'],
        certifications: ['TensorFlow Developer Certificate'],
      },
      {
        role: 'ML Engineer',
        duration: '1.5 years',
        description: 'Joined a startup building ML pipelines and deploying models',
        projects: ['Recommendation engine', 'Real-time fraud detection'],
        certifications: ['AWS ML Specialty'],
      },
      {
        role: 'Senior AI Engineer',
        duration: '1 year',
        description: 'Leading AI initiatives at Google, working on large-scale ML systems',
        projects: ['Search ranking model', 'Large language model fine-tuning'],
        certifications: ['Google Cloud Professional ML Engineer'],
      },
    ],
  },
  {
    career: 'AI Engineer',
    person: 'Marcus Rodriguez',
    role: 'AI Research Engineer at OpenAI',
    timeline: '3 years',
    steps: [
      {
        role: 'CS Student',
        duration: '4 years',
        description: 'Computer Science degree with focus on algorithms and math',
        projects: ['Chess AI', 'Neural network from scratch'],
        certifications: ['Deep Learning Specialization'],
      },
      {
        role: 'Research Assistant',
        duration: '1 year',
        description: 'Worked in a university AI lab on NLP research',
        projects: ['Text summarization model', 'Question answering system'],
        certifications: ['NLP Specialization'],
      },
      {
        role: 'AI Research Engineer',
        duration: '2 years',
        description: 'Research engineer at OpenAI working on frontier models',
        projects: ['Language model training', 'Reinforcement learning from feedback'],
        certifications: ['OpenAI Research Certification'],
      },
    ],
  },
  {
    career: 'AI Engineer',
    person: 'Priya Patel',
    role: 'Lead AI Engineer at Microsoft',
    timeline: '5 years',
    steps: [
      {
        role: 'Data Analyst',
        duration: '1 year',
        description: 'Started in data analytics working with SQL and Python',
        projects: ['Sales dashboard', 'Customer segmentation analysis'],
        certifications: ['Google Data Analytics'],
      },
      {
        role: 'Data Scientist',
        duration: '2 years',
        description: 'Transitioned to data science with ML and statistics',
        projects: ['Churn prediction model', 'Demand forecasting system'],
        certifications: ['IBM Data Science Professional'],
      },
      {
        role: 'ML Engineer',
        duration: '1.5 years',
        description: 'Built production ML systems at a fintech company',
        projects: ['Credit scoring model', 'Automated trading bot'],
        certifications: ['Azure AI Engineer Associate'],
      },
      {
        role: 'Lead AI Engineer',
        duration: '0.5 years',
        description: 'Leading the AI team at Microsoft focusing on Azure AI',
        projects: ['Enterprise AI platform', 'Multi-modal AI system'],
        certifications: ['Microsoft Certified: Azure AI Engineer'],
      },
    ],
  },
];

export const mockComparison: CareerComparison = {
  career1: 'AI Engineer',
  career2: 'Full Stack Developer',
  skills1: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Statistics', 'Computer Vision', 'MLOps', 'Data Engineering'],
  skills2: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'CSS', 'System Design'],
  commonSkills: ['Python', 'Git', 'API Design', 'Cloud Computing', 'Problem Solving', 'Agile'],
  uniqueSkills1: ['TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Statistics', 'Computer Vision'],
  uniqueSkills2: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'CSS', 'Docker'],
  certifications1: [
    { name: 'TensorFlow Developer Certificate', provider: 'Google' },
    { name: 'AWS ML Specialty', provider: 'Amazon' },
    { name: 'Deep Learning Specialization', provider: 'DeepLearning.AI' },
  ],
  certifications2: [
    { name: 'AWS Solutions Architect', provider: 'Amazon' },
    { name: 'Meta Front-End Developer', provider: 'Meta' },
    { name: 'Full Stack Developer Nanodegree', provider: 'Udacity' },
  ],
  salaryGrowth: [
    { stage: 'Entry', career1: 95000, career2: 75000 },
    { stage: 'Mid', career1: 140000, career2: 110000 },
    { stage: 'Senior', career1: 210000, career2: 160000 },
    { stage: 'Lead', career1: 280000, career2: 220000 },
  ],
  timeline1: '2-3 years',
  timeline2: '1-2 years',
};

export const mockBadges: Badge[] = [
  { id: 'b1', name: 'First Steps', description: 'Complete your first milestone', icon: 'HiFire', earned: false },
  { id: 'b2', name: 'Foundation Builder', description: 'Complete all beginner milestones', icon: 'HiOfficeBuilding', earned: false },
  { id: 'b3', name: 'Skill Accumulator', description: 'Complete 5 milestones', icon: 'HiStar', earned: false },
  { id: 'b4', name: 'Halfway Hero', description: 'Reach 50% roadmap completion', icon: 'HiShieldCheck', earned: false },
  { id: 'b5', name: 'Advanced Achiever', description: 'Complete all advanced milestones', icon: 'HiLightningBolt', earned: false },
  { id: 'b6', name: 'Roadmap Master', description: 'Complete the entire roadmap', icon: 'HiSparkles', earned: false },
];

export const featureShowcase = [
  {
    icon: 'Network',
    title: 'Interactive Skill Trees',
    description: 'Visualize your career path as a dynamic, interactive roadmap with clickable nodes.',
  },
  {
    icon: 'Brain',
    title: 'AI-Powered Recommendations',
    description: 'Our reverse-engineering AI analyzes top professionals and builds your optimal path.',
  },
  {
    icon: 'TrendingUp',
    title: 'Progress Tracking',
    description: 'Mark milestones complete, earn badges, and watch your progress grow in real-time.',
  },
  {
    icon: 'GitCompare',
    title: 'Career Comparison',
    description: 'Compare two career paths side-by-side with skills, salary, and timeline analysis.',
  },
  {
    icon: 'Users',
    title: 'Real Career Journeys',
    description: 'See how real professionals reached your dream role, step by step.',
  },
  {
    icon: 'Download',
    title: 'Export & Share',
    description: 'Export your roadmap as PDF or image, and share it with your network.',
  },
];
