
import { Conversation, DashboardStats, Insight, TeamMember, Training, User, MicroTraining, ScriptSnippet, Badge, StreakInfo } from "@/types";

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
    dueDate: "2025-04-20",
    skill: "objections",
    level: "intermediate",
    progress: 0
  },
  {
    id: "t2",
    title: "Product Knowledge Essentials",
    description: "Comprehensive overview of product features, benefits, and competitive advantages.",
    status: "completed",
    completedDate: "2025-03-10",
    skill: "valueExplanation",
    level: "beginner",
    progress: 100
  },
  {
    id: "t3",
    title: "Upselling Strategies",
    description: "Discover practical methods to increase sales through effective upselling techniques.",
    status: "inProgress",
    dueDate: "2025-04-25",
    skill: "crossSelling",
    level: "advanced",
    progress: 65
  }
];

// New mock data for enhanced training page
export const mockMicroTraining: MicroTraining = {
  id: "m1",
  title: "How to identify customer needs",
  estimatedTime: "3",
  question: "What is the most effective way to identify a customer's unstated needs?",
  answer: "Ask open-ended questions about their goals rather than focusing on product features.",
  completed: false,
  date: "2025-04-13"
};

export const mockScriptSnippets: ScriptSnippet[] = [
  {
    id: "s1",
    category: "objection", // Fixed from "objections" to "objection"
    scenario: "Customer says: 'This is too expensive'",
    aiAnswer: "I understand price is important. Let me explain the value you're getting first: our product has [specific benefits] that will help you [achieve specific outcome]. When you consider the [long-term savings/increased productivity], it's actually a great investment.",
    source: "AI selected this script based on 85 successful sales"
  },
  {
    id: "s2",
    category: "trust", // Fixed from "trustBuilding" to "trust"
    scenario: "First-time customer hesitates to make a decision",
    aiAnswer: "I can see you want to make the right choice. Many of our customers felt the same way initially. What specific concerns do you have that I can address? Also, we offer a 30-day satisfaction guarantee, so you can try it with complete peace of mind.",
    source: "AI selected this script based on 67 successful conversions"
  },
  {
    id: "s3",
    category: "closing",
    scenario: "Customer is interested but wants to 'think about it'",
    aiAnswer: "I understand you want to give this some thought. What specific aspects are you still considering? I'd like to make sure I've given you all the information you need to make a confident decision today.",
    source: "AI selected this script based on 92 successful closures"
  },
  {
    id: "s4",
    category: "crossSell", // Fixed from "crossSelling" to "crossSell"
    scenario: "Customer already decided to purchase main product",
    aiAnswer: "Great choice! Many customers who purchase this also get [complementary product] because it enhances [specific benefit] and [solves related problem]. Would you like to learn how they work together?",
    source: "AI selected this script based on 73 successful cross-sells"
  }
];

export const mockBadges: Badge[] = [
  {
    id: "b1",
    key: "dailyLearner",
    title: "Daily Learner",
    description: "Completed today's micro-training",
    status: "received",
    earnedDate: "2025-04-12"
  },
  {
    id: "b2",
    key: "perfectScore",
    title: "Perfect Score",
    description: "Scored 100% on a training assessment",
    status: "received",
    earnedDate: "2025-04-08"
  },
  {
    id: "b3",
    key: "fiveInARow",
    title: "Five in a Row",
    description: "Completed training 5 days in a row",
    status: "locked"
  },
  {
    id: "b4",
    key: "scriptMaster",
    title: "Script Master",
    description: "Used 5 scripts from the library",
    status: "locked"
  },
  {
    id: "b5",
    key: "teamLeader",
    title: "Team Leader",
    description: "Ranked #1 in your team this week",
    status: "received",
    earnedDate: "2025-04-10"
  }
];

export const mockStreak: StreakInfo = {
  days: 3,
  lastActivity: "2025-04-12"
};
