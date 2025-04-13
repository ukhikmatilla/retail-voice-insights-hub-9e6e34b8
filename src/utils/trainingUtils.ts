
import { format } from 'date-fns/format';
import { subDays } from 'date-fns/subDays';
import { Training } from '@/types';

// Generate progress data for chart
export const generateProgressData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i -= 7) {
    const date = subDays(today, i);
    data.push({
      week: format(date, 'MMM d'),
      completed: Math.floor(Math.random() * 3 + (days - i) / 7), // Increasing trend
      inProgress: Math.floor(Math.random() * 2)
    });
  }
  
  return data;
};

// Filter modules based on selected filters
export const filterTrainingModules = (
  modules: Training[],
  filters: { skill: string; level: string; status: string }
): Training[] => {
  return modules.filter(module => {
    if (filters.skill !== 'all' && module.skill !== filters.skill) return false;
    if (filters.level !== 'all' && module.level !== filters.level) return false;
    if (filters.status !== 'all' && module.status !== filters.status) return false;
    return true;
  });
};
