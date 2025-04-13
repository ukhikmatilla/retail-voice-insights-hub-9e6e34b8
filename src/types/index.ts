
// Extending the existing file with additional HR types

// HR related types
export interface HrTurnoverTrendData {
  month: string;
  hires: number;
  terminations: number;
}

export interface HrDepartmentData {
  department: string;
  count: number;
}

export interface TrainingCompletionData {
  name: string;
  value: number;
}

// Alias for compatibility with existing code
export type DepartmentData = HrDepartmentData;
export type TrainingCompletion = TrainingCompletionData;

export interface HrAiInsight {
  id: number;
  insight: string;
  priority: 'high' | 'medium' | 'low';
}

export interface EmployeeAtRisk {
  id: number;
  name: string;
  position: string;
  issue: string;
  risk: 'high' | 'medium' | 'low';
}

export interface HrRecentHire {
  id: number;
  name: string;
  position: string;
  hireDate: string;
  progress: number;
}

// Alias for compatibility
export type RecentHire = HrRecentHire;

// Badge related types
export interface Badge {
  id: string;
  key: string;
  title: string;
  status: 'received' | 'locked';
  earnedDate?: string;
}

export interface StreakInfo {
  days: number;
  lastLoginDate: string;
}

// Training related types
export interface Training {
  id: string;
  title: string;
  description: string;
  skill: string;
  level: string;
  status: 'recommended' | 'inProgress' | 'completed' | 'assigned';
  progress: number;
  dueDate?: string;
  completedDate?: string;
}

export interface TrainingFilter {
  skill: string;
  level: string;
  status: string;
}

export interface TheorySection {
  type: 'normal' | 'warning' | 'tip' | 'example';
  title?: string;
  content: string;
}

export interface TrainingTheory {
  sections: TheorySection[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrainingQuiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface TrainingResult {
  score: number;
  passed: boolean;
  date: string;
}

export interface MicroTraining {
  id: string;
  title: string;
  estimatedTime: number;
  content: string;
}

export interface ScriptSnippet {
  id: string;
  scenario: string;
  category: string;
  aiAnswer: string;
  source: string;
}

// Insight related types
export type InsightType = 'urgent' | 'opportunity' | 'improvement' | 'behavior' | 'custom';

export interface Insight {
  id: string;
  type: InsightType;
  content: string;
  skillKey?: string;
  timestamp?: string;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'salesperson' | 'manager' | 'hr';
}

// Conversation related types
export interface Conversation {
  id: string;
  date: string;
  duration: number;
  score: number;
  insights: ConversationInsight[];
}

export interface ConversationInsight {
  id: string;
  type: string;
  content: string;
  date: string;
}

// Dashboard related types
export interface DashboardStats {
  totalStores: number;
  totalSellers: number;
  totalCalls: number;
  avgScore: number;
}

// Team member related types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  averageScore?: number;
}

// Store/seller activity data types
export interface StoreActivity {
  id: string;
  name: string;
  location: string;
  score: number;
  status: 'danger' | 'warning' | 'good';
}

export interface SellerTrainingData {
  id: string;
  name: string;
  progress: number;
  modules: {
    total: number;
    completed: number;
  };
}
