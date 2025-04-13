
// Import and export all hooks for easy access
import useEmployeesAtRiskData from './useEmployeesAtRiskData';
import useDepartmentData from './useDepartmentData';
import useTrainingCompletionData from './useTrainingCompletionData';
import useRecentHiresData from './useRecentHiresData';
import useTrainingFilters from './useTrainingFilters';
import useInsightsFilters from './useInsightsFilters';

// Mock hooks for the manager dashboard
const useDashboardStats = () => ({
  data: {
    totalStores: 24,
    totalSellers: 132,
    totalCalls: 876,
    avgScore: 84
  },
  error: null
});

const useAiWeeklyInsights = () => ({
  data: [
    { id: 1, type: 'urgent', content: 'insights.urgentInsight1' },
    { id: 2, type: 'opportunity', content: 'insights.opportunityInsight1' },
    { id: 3, type: 'improvement', content: 'insights.improvementInsight1' }
  ],
  error: null
});

const useFocusOfWeek = () => ({
  data: 'manager.focusOfWeek',
  error: null
});

const useStoreActivity = (
  searchQuery: string, 
  statusFilter: string, 
  sortBy: string, 
  page: number, 
  pageSize: number
) => ({
  data: [
    { 
      id: '1', 
      name: 'Downtown Store', 
      location: 'Central District', 
      score: 92, 
      status: 'good' as const
    },
    { 
      id: '2', 
      name: 'Mall Location', 
      location: 'Shopping Center', 
      score: 78, 
      status: 'warning' as const
    },
    { 
      id: '3', 
      name: 'West Side', 
      location: 'Western District', 
      score: 65, 
      status: 'danger' as const
    }
  ],
  currentPage: page,
  totalPages: 3,
  totalItems: 15,
  error: null
});

const useSellerTrainingData = (
  searchQuery: string, 
  sortBy: string, 
  page: number, 
  pageSize: number
) => ({
  data: [
    { 
      id: '1', 
      name: 'John Smith', 
      progress: 75, 
      modules: { total: 12, completed: 9 } 
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      progress: 92, 
      modules: { total: 12, completed: 11 } 
    },
    { 
      id: '3', 
      name: 'Robert Williams', 
      progress: 42, 
      modules: { total: 12, completed: 5 } 
    }
  ],
  currentPage: page,
  totalPages: 4,
  totalItems: 18,
  error: null
});

// Mock useTurnoverTrendData hook
const useTurnoverTrendData = (data) => {
  return data;
};

// Export all hooks
export {
  useEmployeesAtRiskData,
  useDepartmentData,
  useTrainingCompletionData,
  useRecentHiresData,
  useTrainingFilters,
  useInsightsFilters,
  useDashboardStats,
  useAiWeeklyInsights,
  useFocusOfWeek,
  useStoreActivity,
  useSellerTrainingData,
  useTurnoverTrendData
};

export type TurnoverTrendData = {
  month: string;
  hires: number;
  terminations: number;
};
