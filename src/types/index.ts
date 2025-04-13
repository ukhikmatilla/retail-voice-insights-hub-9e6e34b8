
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
