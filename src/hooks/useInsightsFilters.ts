import { Insight } from '@/types';
import { useEffect, useState } from 'react';

type InsightType = 'all' | 'improvement' | 'opportunity' | 'urgent' | 'behavior' | 'custom';
type SkillFilter = 'all' | 'trustBuilding' | 'objections' | 'crossSelling' | 'valueExplanation' | 'closing';
type DateRange = '7days' | '30days' | '90days' | 'custom';

interface UseInsightsFiltersProps {
  initialData: Insight[];
  insightType: InsightType;
  skillFilter: SkillFilter;
  dateRange: DateRange;
}

const useInsightsFilters = ({
  initialData,
  insightType,
  skillFilter,
  dateRange,
}: UseInsightsFiltersProps) => {
  const [filteredData, setFilteredData] = useState<Insight[]>(initialData);

  useEffect(() => {
    const now = new Date();
    const filtered = initialData.filter((insight) => {
      // Filter by insight type
      if (insightType !== 'all' && insight.type !== insightType) {
        return false;
      }

      // Filter by skill
      if (skillFilter !== 'all' && insight.skillKey !== skillFilter) {
        return false;
      }

      // Filter by date range
      if (dateRange !== 'custom') {
        let daysAgo = 0;
        switch (dateRange) {
          case '7days':
            daysAgo = 7;
            break;
          case '30days':
            daysAgo = 30;
            break;
          case '90days':
            daysAgo = 90;
            break;
        }

        const dateThreshold = new Date(now);
        dateThreshold.setDate(now.getDate() - daysAgo);
        // Hardcoded date for filtering for testing
        const insightDate = new Date('2025-04-15');

        return insightDate >= dateThreshold;
      }

      return true;
    });

    setFilteredData(filtered);
  }, [initialData, insightType, skillFilter, dateRange]);

  return filteredData;
};

export default useInsightsFilters;