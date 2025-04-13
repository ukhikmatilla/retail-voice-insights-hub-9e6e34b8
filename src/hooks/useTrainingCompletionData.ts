import { TrainingCompletion } from '@/types';

type TrainingCompletionData = {
  name: string;
  value: number;
};

type Result = TrainingCompletionData[] | { error: string };

const useTrainingCompletionData = (trainingCompletionData: TrainingCompletion[]): Result => {
  try {
    return trainingCompletionData.map(item => ({
      name: item.name,
      value: item.value,
    }));
  } catch (error: any) {
    return { error: error.message || 'An error occurred' };
  }
};
export default useTrainingCompletionData;