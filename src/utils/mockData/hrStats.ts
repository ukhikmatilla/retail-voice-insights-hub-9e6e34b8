
// HR department mock data for dashboard visualizations

export interface HRMetric {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface HRTurnoverData {
  month: string;
  hires: number;
  terminations: number;
}

export interface HRDepartmentData {
  department: string;
  count: number;
}

export interface HRTrainingData {
  name: string;
  value: number;
}

export interface HREmployeeAtRisk {
  id: number;
  name: string;
  position: string;
  issue: string;
  risk: 'high' | 'medium' | 'low';
}

export interface HRRecentHire {
  id: number;
  name: string;
  position: string;
  hireDate: string;
  progress: number;
}

export interface HRAiInsight {
  id: number;
  insight: string;
  priority: 'high' | 'medium' | 'low';
}

// HR Dashboard mock data
export const mockHrStats = {
  personnelCount: 245,
  activeEmployees: 212,
  newThisMonth: 18,
  terminationsThisMonth: 7,
  trainingProgress: '76%',
  averageTenure: '2.7',
  adaptationLevel: '82%',
  requiredTraining: 12
};

export const mockTurnoverTrend: HRTurnoverData[] = [
  { month: 'Jan', hires: 10, terminations: 3 },
  { month: 'Feb', hires: 7, terminations: 5 },
  { month: 'Mar', hires: 12, terminations: 4 },
  { month: 'Apr', hires: 8, terminations: 7 },
  { month: 'May', hires: 15, terminations: 6 },
  { month: 'Jun', hires: 5, terminations: 8 },
];

export const mockDepartmentData: HRDepartmentData[] = [
  { department: 'Sales', count: 48 },
  { department: 'Marketing', count: 24 },
  { department: 'IT', count: 32 },
  { department: 'HR', count: 12 },
  { department: 'Finance', count: 20 },
];

export const mockTrainingCompletionData: HRTrainingData[] = [
  { name: 'Completed', value: 72 },
  { name: 'In Progress', value: 18 },
  { name: 'Not Started', value: 10 },
];

export const mockEmployeesAtRisk: HREmployeeAtRisk[] = [
  { id: 1, name: 'Alex Johnson', position: 'Sales Representative', issue: 'No training progress for 14 days', risk: 'high' },
  { id: 2, name: 'Maria Garcia', position: 'Customer Support', issue: 'Performance below threshold', risk: 'medium' },
  { id: 3, name: 'Wei Chen', position: 'Marketing Specialist', issue: 'Incomplete onboarding', risk: 'high' },
];

export const mockRecentHires: HRRecentHire[] = [
  { id: 1, name: 'Emma Wilson', position: 'Sales Manager', hireDate: '2025-03-28', progress: 45 },
  { id: 2, name: 'James Brown', position: 'IT Support', hireDate: '2025-04-02', progress: 30 },
  { id: 3, name: 'Sofia Rodriguez', position: 'Marketing Assistant', hireDate: '2025-04-10', progress: 15 },
];

export const mockAiInsights: HRAiInsight[] = [
  { id: 1, insight: 'hr.aiInsight1', priority: 'high' },
  { id: 2, insight: 'hr.aiInsight2', priority: 'medium' },
  { id: 3, insight: 'hr.aiInsight3', priority: 'low' },
];
