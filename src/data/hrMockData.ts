import {
  HrAiInsight,
  HrDepartmentData,
  HrTurnoverTrendData,
  TrainingCompletionData,
} from '@/types';
import { Seller } from '@/types/commonTypes';
import { sellers } from './commonMockData';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const turnoverTrendData: HrTurnoverTrendData[] = months
  .map((month, index) => ({
    month,
    hires: Math.floor(Math.random() * 20) + 5,
    terminations: Math.floor(Math.random() * 10) + 2,
  }))
  .sort((a, b) => months.indexOf(b.month) - months.indexOf(a.month));

const departments = [
  'Sales',
  'Marketing',
  'IT',
  'HR',
  'Finance',
  'Product',
  'Engineering',
  'Design',
  'Operations',
  'Customer Support',
];

export const departmentData: HrDepartmentData[] = departments.map(
  (department) => ({
    department,
    count: Math.floor(Math.random() * 50) + 10,
  })
);

export const trainingCompletionData: TrainingCompletionData[] = [
  { name: 'Completed', value: Math.floor(Math.random() * 80) + 20 },
  { name: 'In Progress', value: Math.floor(Math.random() * 50) },
  { name: 'Not Started', value: Math.floor(Math.random() * 30) },
];

const issues = [
  'No training progress for 14 days',
  'Performance below threshold',
  'Incomplete onboarding',
  'Frequent absences',
  'Negative feedback from customers',
  'Lack of collaboration',
  'Missed deadlines',
  'Poor communication',
  'Low engagement',
  'Conflict with team members',
];

const riskLevels = ['high', 'medium', 'low'];

const generateSellerAtRisk = (): Seller & {
  issue: string;
  risk: 'high' | 'medium' | 'low';
} => {
  const seller = sellers[Math.floor(Math.random() * sellers.length)];
  return {
    ...seller,
    issue: issues[Math.floor(Math.random() * issues.length)],
    risk: riskLevels[Math.floor(Math.random() * riskLevels.length)] as
      | 'high'
      | 'medium'
      | 'low',
  };
};

export const employeesAtRisk = Array.from({ length: 30 }, () =>
  generateSellerAtRisk()
);

const generateRecentHire = (): Seller & { hireDate: string } => {
  const seller = sellers[Math.floor(Math.random() * sellers.length)];
  return {
    ...seller,
    hireDate: generateRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31))
      .toISOString()
      .split('T')[0],
  };
};

export const recentHires = Array.from({ length: 25 }, () =>
  generateRecentHire()
).sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime());

export const aiInsights: HrAiInsight[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  insight: `insights.aiInsight${Math.floor(Math.random() * 5) + 1}`,
  priority: riskLevels[Math.floor(Math.random() * riskLevels.length)] as
    | 'high'
    | 'medium'
    | 'low',
}));

export const recentHires: HrRecentHire[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `New Hire ${i + 1}`,
  position: positions[Math.floor(Math.random() * positions.length)],
  hireDate: generateRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31))
    .toISOString()
    .split('T')[0],
  progress: Math.floor(Math.random() * 100),
})).sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime());

export const aiInsights: HrAiInsight[] = [
  { id: 1, insight: 'insights.aiInsight1', priority: 'high' },
  { id: 2, insight: 'insights.aiInsight2', priority: 'medium' },
  { id: 3, insight: 'insights.aiInsight3', priority: 'low' },
];