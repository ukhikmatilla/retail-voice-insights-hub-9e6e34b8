
export type UserRole = 'salesperson' | 'manager' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  language: 'uz' | 'ru';
}

export interface Conversation {
  id: string;
  userId: string;
  date: string;
  duration: number;
  score: number;
  insights: Insight[];
}

export type InsightType = 'improvement' | 'opportunity' | 'urgent' | 'behavior' | 'custom';

export interface Insight {
  id: string;
  type: InsightType;
  content: string;
  timestamp?: string;
  skillKey?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  conversationsCount: number;
  averageScore: number;
  successRate: number;
}

export interface DashboardStats {
  totalConversations: number;
  averageScore: number;
  successRate: number;
  missedOpportunities: number;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  status: 'assigned' | 'inProgress' | 'completed' | 'recommended';
  dueDate?: string;
  completedDate?: string;
  skill: string;
  level: string;
  progress: number;
}

// New interfaces for enhanced training page
export interface MicroTraining {
  id: string;
  title: string;
  estimatedTime: string;
  question: string;
  answer: string;
  completed: boolean;
  date: string;
}

export interface ScriptSnippet {
  id: string;
  category: string;
  scenario: string;
  aiAnswer: string;
  source: string;
  expanded?: boolean;
}

export interface Badge {
  id: string;
  key: string;
  title: string;
  description: string;
  status: 'received' | 'locked';
  icon?: string;
  earnedDate?: string;
}

export interface StreakInfo {
  days: number;
  lastActivity: string;
}

// Training Module specific interfaces
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  dueDate: string;
  videoUrl: string;
  videoDuration: string;
  skill: string;
  theory: TrainingTheory;
  aiTips: string[];
  quiz: TrainingQuiz;
  relatedScripts: ScriptSnippet[];
  badges: string[];
}

export interface TrainingTheory {
  sections: TheorySection[];
}

export interface TheorySection {
  title: string;
  content: string;
  type: 'text' | 'example' | 'warning' | 'tip';
}

export interface TrainingQuiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrainingResult {
  score: number;
  completed: boolean;
  earnedBadges: string[];
  feedback: string;
}

// New interfaces for Udemy-like module structure
export interface TrainingStep {
  id: string;
  title: string;
  type: 'video' | 'theory' | 'quiz';
  status: 'completed' | 'in_progress' | 'locked';
  youtubeUrl?: string;
  content?: string;
}
