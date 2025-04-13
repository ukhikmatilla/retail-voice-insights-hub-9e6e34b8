
import { format } from 'date-fns';
import { TeamMember } from './types';

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
