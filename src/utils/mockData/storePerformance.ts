
import { Store } from './types';

export interface StorePerformance extends Store {
  averageScore: number;
  totalCalls: number;
  redFlags: number;
  status: 'good' | 'warning' | 'critical';
}

export const mockStorePerformance: StorePerformance[] = [
  { 
    id: '1', 
    name: 'Yunusabad Plaza', 
    averageScore: 8.2, 
    totalCalls: 44, 
    redFlags: 3,
    status: 'good'
  },
  { 
    id: '2', 
    name: 'Samarkand City', 
    averageScore: 7.5, 
    totalCalls: 36, 
    redFlags: 5,
    status: 'good'
  },
  { 
    id: '3', 
    name: 'Bukhara Mall', 
    averageScore: 6.1, 
    totalCalls: 33, 
    redFlags: 11,
    status: 'warning'
  },
  { 
    id: '4', 
    name: 'Chorsu Market', 
    averageScore: 5.4, 
    totalCalls: 28, 
    redFlags: 15,
    status: 'critical'
  },
  { 
    id: '5', 
    name: 'Namangan City Center', 
    averageScore: 7.8, 
    totalCalls: 39, 
    redFlags: 4,
    status: 'good'
  }
];
