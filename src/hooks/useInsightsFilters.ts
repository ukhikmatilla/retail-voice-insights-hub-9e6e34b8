
import { useState } from 'react';
import { Insight } from '@/types';

interface InsightsFilters {
  seller: string;
  store: string;
  dateRange: string;
  insightType: string;
  skill: string;
}

export const useInsightsFilters = (initialFilters?: Partial<InsightsFilters>) => {
  const [filters, setFilters] = useState<InsightsFilters>({
    seller: initialFilters?.seller || 'all',
    store: initialFilters?.store || 'all',
    dateRange: initialFilters?.dateRange || 'last7Days',
    insightType: initialFilters?.insightType || 'all',
    skill: initialFilters?.skill || 'all',
  });
  
  // Function to apply filters to insights
  const applyFilters = (insights: Insight[]) => {
    return insights.filter(insight => {
      // Add filtering logic based on the selected filters
      return true;
    });
  };
  
  // Function to update filters
  const updateFilters = (newFilters: Partial<InsightsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      seller: 'all',
      store: 'all', 
      dateRange: 'last7Days',
      insightType: 'all',
      skill: 'all',
    });
  };
  
  return {
    filters,
    updateFilters,
    resetFilters,
    applyFilters,
    activeFilterCount: Object.values(filters).filter(v => v !== 'all').length,
  };
};

export default useInsightsFilters;
