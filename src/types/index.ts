
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

// Additional types for manager data
export interface SellerTrainingData {
  id: string;
  name: string;
  progress: number;
  lastActivity: string;
}

export interface StoreActivity {
  id: string;
  name: string;
  performance: number;
  trend: 'up' | 'down' | 'stable';
  conversations: number;
}

// HR data types
export interface HrDepartmentData {
  name: string;
  value: number;
  fill: string;
}

export interface HrRecentHire {
  id: string;
  name: string;
  position: string;
  department: string;
  hiredDate: string;
  avatar?: string;
}

export interface TrainingCompletionData {
  name: string;
  completed: number;
  assigned: number;
}

export interface ConversationInsight {
  id: string;
  type: string;
  content: string;
  date: string;
}

export interface TrainingFilter {
  skill: string;
  level: string;
  status: string;
}
