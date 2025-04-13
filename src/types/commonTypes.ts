export type Status = 'danger' | 'warning' | 'good';

export type InsightType = 'urgent' | 'opportunity' | 'improvement';

export interface Seller {
  id: string;
  name: string;
  totalModules: number;
  completedModules: number;
  progressPercent: number;
}

export interface Store {
  id: string;
  name: string;
  score: number;
  status: Status;
  location: string;
}

export interface Insight {
  id: string;
  type: InsightType;
  content: string;
}