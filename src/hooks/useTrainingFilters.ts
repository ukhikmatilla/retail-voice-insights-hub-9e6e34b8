
import { Training } from '@/types';

interface TrainingFilter {
  skill: string;
  level: string;
  status: string;
}

const useTrainingFilters = (
  trainingModules: Training[], 
  filters: TrainingFilter
): { filteredModules: Training[] } => {
  const filteredModules = trainingModules.filter((module) => {
    const skillMatch = filters.skill === 'all' || module.skill === filters.skill;
    const levelMatch = filters.level === 'all' || module.level === filters.level;
    const statusMatch = filters.status === 'all' || module.status === filters.status;

    return skillMatch && levelMatch && statusMatch;
  });

  return { filteredModules };
};

export default useTrainingFilters;
