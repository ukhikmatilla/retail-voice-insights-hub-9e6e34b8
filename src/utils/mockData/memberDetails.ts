
import { TeamMemberDetails } from './types';

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
