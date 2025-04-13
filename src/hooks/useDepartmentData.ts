import { DepartmentData } from '@/types';

type UseDepartmentData = (
  departmentData: DepartmentData[]
) => DepartmentData[] | { error: string };

const useDepartmentData: UseDepartmentData = (departmentData) => {
  try {
    return departmentData;
  } catch (error: any) {
    return { error: error.message || 'An unexpected error occurred' };
  }
};

export default useDepartmentData;