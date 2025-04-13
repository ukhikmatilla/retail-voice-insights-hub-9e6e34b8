
import { TeamMember } from './types';

export interface SellerPerformance {
  id: string;
  name: string;
  score: number;
  callsCount: number;
  flaggedCalls: number;
  storeId: string;
  aiComment?: string;
}

// Top performers
export const topPerformers: SellerPerformance[] = [
  {
    id: '101',
    name: 'Alisher Karimov',
    score: 9.2,
    callsCount: 28,
    flaggedCalls: 1,
    storeId: '1',
    aiComment: 'Excellent at building trust and handling objections'
  },
  {
    id: '102',
    name: 'Malika Usmanova',
    score: 8.7,
    callsCount: 32,
    flaggedCalls: 3,
    storeId: '5',
    aiComment: 'Strong in product knowledge and cross-selling'
  },
  {
    id: '103',
    name: 'Temur Yusupov',
    score: 8.5,
    callsCount: 25,
    flaggedCalls: 2,
    storeId: '2',
    aiComment: 'Good at clarifying customer needs'
  },
  {
    id: '104',
    name: 'Nilufar Azimova',
    score: 8.3,
    callsCount: 30,
    flaggedCalls: 3,
    storeId: '1',
    aiComment: 'Excellent closing techniques'
  },
  {
    id: '105',
    name: 'Jahongir Kamilov',
    score: 8.1,
    callsCount: 27,
    flaggedCalls: 2,
    storeId: '5',
    aiComment: 'Effective at overcoming price objections'
  }
];

// Bottom performers
export const bottomPerformers: SellerPerformance[] = [
  {
    id: '201',
    name: 'Aziza Rakhimova',
    score: 5.2,
    callsCount: 22,
    flaggedCalls: 12,
    storeId: '3',
    aiComment: 'Needs better objection handling techniques'
  },
  {
    id: '202',
    name: 'Rustam Saidov',
    score: 5.5,
    callsCount: 18,
    flaggedCalls: 9,
    storeId: '4',
    aiComment: 'Requires improvement in value argumentation'
  },
  {
    id: '203',
    name: 'Kamola Umarova',
    score: 5.7,
    callsCount: 20,
    flaggedCalls: 10,
    storeId: '4',
    aiComment: 'Should focus on asking more open-ended questions'
  },
  {
    id: '204',
    name: 'Dilshod Fazliddinov',
    score: 5.9,
    callsCount: 24,
    flaggedCalls: 11,
    storeId: '3',
    aiComment: 'Needs to work on trust-building techniques'
  },
  {
    id: '205',
    name: 'Feruza Mahmudova',
    score: 6.1,
    callsCount: 25,
    flaggedCalls: 8,
    storeId: '3',
    aiComment: 'Should improve product knowledge and benefits explanation'
  }
];
