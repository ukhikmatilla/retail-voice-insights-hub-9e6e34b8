
export interface Store {
  id: string;
  name: string;
  location?: string;
  score: number;
  sellersCount: number;
  lastUpdated: Date;
}

export type StatusType = 'success' | 'warning' | 'danger';

export interface StoreFormData {
  name: string;
  location?: string;
}
