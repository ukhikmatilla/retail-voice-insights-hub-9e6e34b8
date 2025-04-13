import { Training, TrainingFilter } from '@/types';

interface UseTrainingFilters {
  trainingModules: Training[];
  filters: TrainingFilter;
}

const useTrainingFilters = ({ trainingModules, filters }: UseTrainingFilters): Training[] => {
  return trainingModules.filter((module) => {
    const skillMatch = filters.skill === 'all' || module.skill === filters.skill;
    const levelMatch = filters.level === 'all' || module.level === filters.level;
    const statusMatch = filters.status === 'all' || module.status === filters.status;

    return skillMatch && levelMatch && statusMatch;
  });
};

export default useTrainingFilters;