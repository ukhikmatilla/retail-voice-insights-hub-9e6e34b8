
import { Training } from '@/types';

export const trainingModules: Training[] = [
  {
    id: '1',
    title: 'Handling Price Objections',
    description: 'Learn effective strategies to address price concerns from customers.',
    skill: 'objections',
    level: 'intermediate',
    status: 'recommended',
    progress: 0,
    dueDate: '2025-05-01'
  },
  {
    id: '2',
    title: 'Building Initial Trust',
    description: 'Master the art of establishing trust in the first minutes of customer interaction.',
    skill: 'trustBuilding',
    level: 'beginner',
    status: 'inProgress',
    progress: 35,
    dueDate: '2025-04-25'
  },
  {
    id: '3',
    title: 'Effective Cross-selling',
    description: 'Discover techniques to increase basket size through relevant recommendations.',
    skill: 'crossSelling',
    level: 'advanced',
    status: 'inProgress',
    progress: 75,
    dueDate: '2025-04-20'
  },
  {
    id: '4',
    title: 'Advanced Closing Techniques',
    description: 'Learn psychology-based approaches to closing sales with higher success rates.',
    skill: 'closing',
    level: 'advanced',
    status: 'completed',
    progress: 100,
    completedDate: '2025-04-01'
  },
  {
    id: '5',
    title: 'Value Communication',
    description: 'Learn how to effectively communicate product value rather than features.',
    skill: 'valueExplanation',
    level: 'intermediate',
    status: 'completed',
    progress: 100,
    completedDate: '2025-03-15'
  },
  {
    id: '6',
    title: 'Understanding Customer Signals',
    description: 'Recognize verbal and non-verbal cues to better address customer needs.',
    skill: 'trustBuilding',
    level: 'intermediate',
    status: 'assigned',
    progress: 0,
    dueDate: '2025-05-10'
  }
];
