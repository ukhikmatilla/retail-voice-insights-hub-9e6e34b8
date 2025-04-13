
import { Training } from '@/types';

export const trainingModules: Training[] = [
  {
    id: "1",
    title: "Building Client Relationships",
    description: "Learn how to build lasting relationships with clients that lead to repeat business and referrals.",
    status: "inProgress",
    dueDate: "2023-05-20",
    skill: "relationship",
    level: "beginner",
    progress: 45,
  },
  {
    id: "2",
    title: "Handling Price Objections",
    description: "Master techniques for addressing price concerns without discounting your value.",
    status: "recommended",
    skill: "negotiation",
    level: "intermediate",
    progress: 0,
  },
  {
    id: "3",
    title: "Product Knowledge Mastery",
    description: "Deepen your understanding of our complete product lineup and key differentiators.",
    status: "completed",
    completedDate: "2023-04-15",
    skill: "product",
    level: "advanced",
    progress: 100,
  },
  {
    id: "4",
    title: "Effective Closing Techniques",
    description: "Learn various approaches to confidently close sales without being pushy.",
    status: "assigned",
    dueDate: "2023-06-10",
    skill: "closing",
    level: "intermediate",
    progress: 0,
  },
  {
    id: "5",
    title: "Retail Visual Merchandising",
    description: "Master the art of creating compelling product displays that drive sales.",
    status: "inProgress",
    dueDate: "2023-05-25",
    skill: "merchandising",
    level: "beginner", 
    progress: 30,
  }
];
