
import { useState } from 'react';
import { Training, TrainingFilter } from '@/types';
import { filterTrainingModules } from '@/utils/trainingUtils';

export const useTrainingFilters = (initialFilters?: Partial<TrainingFilter>) => {
  const [filters, setFilters] = useState<TrainingFilter>({
    skill: initialFilters?.skill || 'all',
    level: initialFilters?.level || 'all',
    status: initialFilters?.status || 'all',
  });
  
  // Function to update filters
  const updateFilters = (newFilters: Partial<TrainingFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      skill: 'all',
      level: 'all',
      status: 'all',
    });
  };
  
  // Function to filter training modules
  const filterModules = (modules: Training[]) => {
    return filterTrainingModules(modules, filters);
  };
  
  return {
    filters,
    updateFilters,
    resetFilters,
    filterModules,
    activeFilterCount: Object.values(filters).filter(v => v !== 'all').length,
  };
};

export default useTrainingFilters;
