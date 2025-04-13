// Extending the existing file with additional HR types

// HR related types
export interface HrTurnoverTrendData {
  month: string;
  hires: number;
  terminations: number;
}

export interface HrDepartmentData {
  department: string;
  count: number;
}

export interface TrainingCompletionData {
  name: string;
  value: number;
}

export interface HrAiInsight {
  id: number;
  insight: string;
  priority: 'high' | 'medium' | 'low';
}

export interface EmployeeAtRisk {
  id: number;
  name: string;
  position: string;
  issue: string;
  risk: 'high' | 'medium' | 'low';
}

export interface HrRecentHire {
  id: number;
  name: string;
  position: string;
  hireDate: string;
  progress: number;
}
