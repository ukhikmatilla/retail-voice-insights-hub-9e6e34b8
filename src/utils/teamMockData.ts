
import { format } from 'date-fns';

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

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Aziz Rakhimov',
    email: 'aziz@example.com',
    role: 'salesperson',
    status: 'active',
    lastLogin: format(new Date(2025, 3, 10), 'yyyy-MM-dd'),
    store: 'Yunusabad Plaza',
    avatar: '/placeholder.svg',
    averageScore: 85,
    conversationsCount: 24,
    successRate: 78
  },
  {
    id: '2',
    name: 'Dilnoza Karimova',
    email: 'dilnoza@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: format(new Date(2025, 3, 12), 'yyyy-MM-dd'),
    avatar: '/placeholder.svg',
    averageScore: 92,
    conversationsCount: 18,
    successRate: 94
  },
  {
    id: '3',
    name: 'Mikhail Petrov',
    email: 'mikhail@example.com',
    role: 'hr',
    status: 'active',
    lastLogin: format(new Date(2025, 3, 9), 'yyyy-MM-dd'),
    avatar: '/placeholder.svg',
    averageScore: 88,
    conversationsCount: 5,
    successRate: 80
  },
  {
    id: '4',
    name: 'Gulnora Akhmedova',
    email: 'gulnora@example.com',
    role: 'salesperson',
    status: 'active',
    lastLogin: format(new Date(2025, 3, 11), 'yyyy-MM-dd'),
    store: 'Samarkand City',
    avatar: '/placeholder.svg',
    averageScore: 71,
    conversationsCount: 32,
    successRate: 65
  },
  {
    id: '5',
    name: 'Timur Yakubov',
    email: 'timur@example.com',
    role: 'salesperson',
    status: 'pending',
    lastLogin: '',
    avatar: '/placeholder.svg',
    averageScore: 0,
    conversationsCount: 0,
    successRate: 0
  }
];

export const mockMemberDetails: Record<string, TeamMemberDetails> = {
  '1': {
    userId: '1',
    averageScore: 85,
    conversations: [
      {
        id: 'c1',
        fileName: 'conversation_20250410_001.mp3',
        date: '2025-04-10',
        duration: 342,
        status: 'done',
        transcriptUrl: '#',
        audioUrl: '#'
      },
      {
        id: 'c2',
        fileName: 'conversation_20250411_002.mp3',
        date: '2025-04-11',
        duration: 248,
        status: 'done',
        transcriptUrl: '#',
        audioUrl: '#'
      }
    ],
    trainingModules: [
      {
        id: 'm1',
        title: 'Handling Price Objections',
        completedDate: '2025-03-15',
        progress: 100
      },
      {
        id: 'm2',
        title: 'Product Knowledge Essentials',
        completedDate: '2025-02-28',
        progress: 100
      },
      {
        id: 'm3',
        title: 'Upselling Techniques',
        completedDate: '',
        progress: 65
      }
    ],
    badges: [
      {
        id: 'b1',
        title: 'Perfect Score',
        earnedDate: '2025-03-20',
        icon: '🏆'
      },
      {
        id: 'b2',
        title: 'Fast Learner',
        earnedDate: '2025-02-15',
        icon: '🚀'
      }
    ],
    selectedTranscript: `
      Customer: Hello, I'm looking for a new smartphone.
      Salesperson: Hi there! Welcome to our store. What kind of features are you looking for in a smartphone?
      Customer: Well, I need good battery life and a great camera.
      Salesperson: We have several models that excel in those areas. Let me show you our top three options that combine excellent battery performance with advanced camera systems.
      Customer: That sounds good, but what about the price?
      Salesperson: Our phones range from mid-range to premium. Let me understand your budget first so I can recommend the best value for your needs.
    `
  },
  '4': {
    userId: '4',
    averageScore: 71,
    conversations: [
      {
        id: 'c3',
        fileName: 'conversation_20250409_003.mp3',
        date: '2025-04-09',
        duration: 412,
        status: 'done',
        transcriptUrl: '#',
        audioUrl: '#'
      }
    ],
    trainingModules: [
      {
        id: 'm1',
        title: 'Handling Price Objections',
        completedDate: '2025-03-25',
        progress: 100
      },
      {
        id: 'm4',
        title: 'Effective Communication',
        completedDate: '2025-03-10',
        progress: 100
      }
    ],
    badges: [
      {
        id: 'b3',
        title: 'Team Leader',
        earnedDate: '2025-04-01',
        icon: '👑'
      }
    ],
    selectedTranscript: ``
  }
};

export const mockStores = [
  { id: '1', name: 'Yunusabad Plaza' },
  { id: '2', name: 'Samarkand City' },
  { id: '3', name: 'Bukhara Mall' },
  { id: '4', name: 'Chorsu Market' },
  { id: '5', name: 'Namangan City Center' }
];
