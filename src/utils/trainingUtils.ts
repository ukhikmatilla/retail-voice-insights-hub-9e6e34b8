
import { Training } from '@/types';

export const generateProgressData = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const data = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(oneWeekAgo);
    date.setDate(oneWeekAgo.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      progress: Math.floor(Math.random() * 100)
    });
  }
  
  return data;
};

export const filterTrainings = (trainings: Training[], filters: any) => {
  return trainings.filter(training => {
    const skillMatch = !filters.skill || filters.skill === 'all' || training.skill === filters.skill;
    const levelMatch = !filters.level || filters.level === 'all' || training.level === filters.level;
    const statusMatch = !filters.status || filters.status === 'all' || training.status === filters.status;
    
    return skillMatch && levelMatch && statusMatch;
  });
};
