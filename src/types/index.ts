
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
  status: 'assigned' | 'inProgress' | 'completed';
  dueDate?: string;
}
