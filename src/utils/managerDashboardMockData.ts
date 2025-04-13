
interface StoreActivity {
  id: string;
  name: string;
  score: number;
  status: 'success' | 'warning' | 'danger';
  sellerCount: number;
  location: string;
}

interface AiInsight {
  id: string;
  type: 'improvement' | 'opportunity' | 'urgent';
  content: string;
}

interface DashboardStats {
  totalStores: number;
  totalSellers: number;
  totalCalls: number;
  avgScore: number;
}

export const mockDashboardStats: DashboardStats = {
  totalStores: 24,
  totalSellers: 156,
  totalCalls: 1245,
  avgScore: 78
};

export const mockAiWeeklyInsights: AiInsight[] = [
  {
    id: '1',
    type: 'improvement',
    content: 'sotuvchi.improvement.questioning'
  },
  {
    id: '2',
    type: 'opportunity',
    content: 'sotuvchi.opportunity.upselling'
  },
  {
    id: '3',
    type: 'urgent',
    content: 'sotuvchi.urgent.pricing'
  }
];

export const mockFocusOfWeek = 'sotuvchi.focus.clarifyingObjections';

export const mockStoreActivity: StoreActivity[] = [
  {
    id: '1',
    name: 'Yunusabad Plaza',
    score: 92,
    status: 'success',
    sellerCount: 12,
    location: 'Tashkent'
  },
  {
    id: '2',
    name: 'Samarkand City',
    score: 78,
    status: 'warning',
    sellerCount: 8,
    location: 'Samarkand'
  },
  {
    id: '3',
    name: 'Bukhara Mall',
    score: 65,
    status: 'danger',
    sellerCount: 10,
    location: 'Bukhara'
  },
  {
    id: '4',
    name: 'Chorsu Market',
    score: 87,
    status: 'success',
    sellerCount: 15,
    location: 'Tashkent'
  },
  {
    id: '5',
    name: 'Namangan City Center',
    score: 81,
    status: 'success',
    sellerCount: 7,
    location: 'Namangan'
  }
];

// Helper function to get status color class based on status
export const getStatusColorClass = (status: 'success' | 'warning' | 'danger') => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'danger':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get insight color class based on type
export const getInsightColorClass = (type: 'improvement' | 'opportunity' | 'urgent') => {
  switch (type) {
    case 'improvement':
      return 'bg-blue-50 border-blue-200';
    case 'opportunity':
      return 'bg-green-50 border-green-200';
    case 'urgent':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};
