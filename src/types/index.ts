
export interface TrainingTheory {
  id: string;
  title: string;
  content: string;
  sections: TheorySection[];
}

export interface TheorySection {
  title: string;
  content: string;
  type: "text" | "warning" | "tip" | "example";
}

export interface TrainingQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
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

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  skill: string;
  theoryId: string;
  videoId: string;
  quizId: string;
  estimatedTime: string;
  dueDate?: string;
  completedDate?: string;
  videoUrl?: string;
  videoDuration?: string;
  theory?: TrainingTheory;
  quiz?: TrainingQuiz;
  aiTips?: string[];
  relatedScripts?: ScriptSnippet[];
}

export interface TrainingStep {
  id: string;
  type: 'intro' | 'theory' | 'video' | 'quiz' | 'aiAdvice';
  moduleId: string;
}

export type ScriptCategory = 'greeting' | 'objection' | 'closing' | 'followUp' | 'pricing' | 'trust' | 'crossSell' | 'other';

export interface ScriptSnippet {
  id: string;
  scenario: string;
  aiAnswer: string;
  category: ScriptCategory;
  source: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  status: 'recommended' | 'assigned' | 'inProgress' | 'completed';
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  dueDate?: string;
  completedDate?: string;
}

export interface MicroTraining {
  id: string;
  title: string;
  estimatedTime: string;
  question: string;
  answer: string;
  completed: boolean;
  date: string;
}

export type InsightType = 'improvement' | 'opportunity' | 'urgent' | 'behavior' | 'custom';

export interface Insight {
  id: string;
  type: InsightType;
  content: string;
  timestamp?: string;
  skillKey?: string;
}

export interface Conversation {
  id: string;
  userId: string;
  date: string;
  duration: number;
  score: number;
  insights: Insight[];
}

export interface DashboardStats {
  totalConversations: number;
  averageScore: number;
  successRate: number;
  missedOpportunities: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  conversationsCount: number;
  averageScore: number;
  successRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'salesperson' | 'manager' | 'hr';
  language: 'uz' | 'ru';
}

export interface Badge {
  id: string;
  key: string;
  title: string;
  description: string;
  status: 'received' | 'locked';
  earnedDate?: string;
}

export interface StreakInfo {
  days: number;
  lastActivity: string;
}

export interface TrainingResult {
  score: number;
  completed: boolean;
  earnedBadges: string[];
  feedback: string;
}

export interface LocalizedString {
  en: string;
  ru: string;
  uz: string;
}

export interface ScriptEntry {
  id: string;
  customerSays: LocalizedString;
  category: ScriptCategory;
  aiResponse: LocalizedString;
  insight: LocalizedString;
}
