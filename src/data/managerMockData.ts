import { Insight, InsightType, Seller, Status, Store } from '@/types/commonTypes';

export interface DashboardStats {
    totalStores: number;
  totalSellers: number;
  totalCalls: number;
  avgScore: number;
}

export interface AiWeeklyInsight {
  id: string;
  type: InsightType;
    content: string;
}

export const mockDashboardStats: DashboardStats = {
    totalStores: 30,
    totalSellers: 150,
    totalCalls: 2000,
    avgScore: 82,
};

export const mockAiWeeklyInsights: Insight[] = [
    {
        id: '1',
        type: 'improvement',
        content: 'insight.content.improveGreeting',
    },
    {
        id: '2',
        type: 'opportunity',
        content: 'insight.content.crossSell',
    },
    {
        id: '3',
        type: 'urgent',
        content: 'insight.content.handleObjections',
    },
    {
        id: '6',
        type: 'urgent',
        content: 'insight.content.urgentFollowUp',
    },
    {
        id: '7',
        type: 'opportunity',
        content: 'insight.content.newProductLaunch',
    },
];

export const mockFocusOfWeek: string = 'insight.content.offerPromotions';

export const mockSellerTrainingData = (): SellerTrainingData[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      totalModules: 10,
      completedModules: 8,
      progressPercent: 80,
    },
    {
      id: '2',
      name: 'Jane Smith',
      totalModules: 10,
      completedModules: 5,
      progressPercent: 50,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      totalModules: 10,
      completedModules: 9,
      progressPercent: 90,
    },
    {
      id: '4',
      name: 'Emily Brown',
      totalModules: 10,
      completedModules: 3,
      progressPercent: 30,
    },
    {
      id: '5',
      name: 'David Lee',
      totalModules: 10,
      completedModules: 6,
      progressPercent: 60,
    },
  ];
};

export const getStatusColorClass = (status: StoreActivity['status']): string => {
    switch (status) {
      case 'danger':
        return 'bg-red-50 text-red-700';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700';
      case 'good':
        return 'bg-green-50 text-green-700';
      default:
        return '';
    }
  };
  
  export const getInsightColorClass = (type: InsightType): string => {
    switch (type) {
      case 'improvement':
        return 'border-green-100 bg-green-50 text-green-700';
      case 'opportunity':
        return 'border-yellow-100 bg-yellow-50 text-yellow-700';
      case 'urgent':
        return 'border-red-100 bg-red-50 text-red-700';
      default:
        return '';
    }
  };