
// Common types for mock data
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'salesperson' | 'manager' | 'hr';
  status: 'active' | 'pending';
  lastLogin: string;
  store?: string;
  avatar?: string;
  averageScore?: number;
  conversationsCount?: number;
  successRate?: number;
}

export interface Conversation {
  id: string;
  fileName: string;
  date: string;
  duration: number;
  status: 'done' | 'analyzing' | 'error';
  transcriptUrl?: string;
  audioUrl?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  completedDate: string;
  progress: number;
}

export interface Badge {
  id: string;
  title: string;
  earnedDate: string;
  icon: string;
}

export interface TeamMemberDetails {
  userId: string;
  conversations: Conversation[];
  trainingModules: TrainingModule[];
  badges: Badge[];
  averageScore?: number;
  selectedTranscript?: string;
}

export interface Store {
  id: string;
  name: string;
}
