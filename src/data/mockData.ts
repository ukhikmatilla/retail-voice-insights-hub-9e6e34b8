
import { Conversation, DashboardStats, Insight, TeamMember, Training, User } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Aziz Rakhimov",
    email: "aziz@example.com",
    role: "salesperson",
    language: "uz"
  },
  {
    id: "2",
    name: "Dilnoza Karimova",
    email: "dilnoza@example.com",
    role: "manager",
    language: "uz"
  },
  {
    id: "3",
    name: "Mikhail Petrov",
    email: "mikhail@example.com",
    role: "hr",
    language: "ru"
  }
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "1",
    userId: "1",
    date: "2025-04-08",
    duration: 342, // in seconds
    score: 87,
    insights: [
      {
        id: "i1",
        type: "improvement",
        content: "Good product knowledge demonstrated. Consider explaining financing options earlier in the conversation."
      },
      {
        id: "i2",
        type: "opportunity",
        content: "Customer showed interest in accessories, but no follow-up occurred."
      }
    ]
  },
  {
    id: "2",
    userId: "1",
    date: "2025-04-10",
    duration: 485,
    score: 72,
    insights: [
      {
        id: "i3",
        type: "urgent",
        content: "Price objection not properly addressed, leading to potential lost sale."
      },
      {
        id: "i4",
        type: "improvement",
        content: "Good rapport building at the beginning of conversation."
      }
    ]
  },
  {
    id: "3",
    userId: "1",
    date: "2025-04-11",
    duration: 257,
    score: 93,
    insights: [
      {
        id: "i5",
        type: "improvement",
        content: "Excellent product comparison and needs assessment."
      }
    ]
  }
];

// Mock dashboard stats
export const mockSalespersonStats: DashboardStats = {
  totalConversations: 23,
  averageScore: 84,
  successRate: 67,
  missedOpportunities: 12
};

export const mockManagerStats: DashboardStats = {
  totalConversations: 156,
  averageScore: 79,
  successRate: 72,
  missedOpportunities: 34
};

export const mockHrStats: DashboardStats = {
  totalConversations: 427,
  averageScore: 81,
  successRate: 70,
  missedOpportunities: 98
};

// Mock team members for manager
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Aziz Rakhimov",
    role: "salesperson",
    conversationsCount: 23,
    averageScore: 84,
    successRate: 67
  },
  {
    id: "4",
    name: "Gulnora Akhmedova",
    role: "salesperson",
    conversationsCount: 19,
    averageScore: 91,
    successRate: 84
  },
  {
    id: "5",
    name: "Botir Kamalov",
    role: "salesperson",
    conversationsCount: 31,
    averageScore: 72,
    successRate: 58
  },
  {
    id: "6",
    name: "Umida Rustamova",
    role: "salesperson",
    conversationsCount: 27,
    averageScore: 76,
    successRate: 67
  },
  {
    id: "7",
    name: "Viktor Ivanov",
    role: "salesperson",
    conversationsCount: 29,
    averageScore: 68,
    successRate: 55
  }
];

// Mock trainings
export const mockTrainings: Training[] = [
  {
    id: "t1",
    title: "Handling Customer Objections",
    description: "Learn effective techniques for addressing common customer concerns and objections during the sales process.",
    status: "assigned",
    dueDate: "2025-04-20"
  },
  {
    id: "t2",
    title: "Product Knowledge Essentials",
    description: "Comprehensive overview of product features, benefits, and competitive advantages.",
    status: "completed"
  },
  {
    id: "t3",
    title: "Upselling Strategies",
    description: "Discover practical methods to increase sales through effective upselling techniques.",
    status: "inProgress",
    dueDate: "2025-04-25"
  }
];
