import { RecentHire } from '@/types';

type SortBy = 'name' | 'hireDate';

interface UseRecentHiresDataResult {
  data: RecentHire[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  error?: string;
}

const useRecentHiresData = (recentHires: RecentHire[], sortBy: SortBy, page: number, pageSize: number): UseRecentHiresDataResult => {
  try {
    const sortedHires = [...recentHires].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'hireDate') {
        return new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime();
      }
      return 0;
    });
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedHires = sortedHires.slice(startIndex, endIndex);

    return {
      data: paginatedHires,
      currentPage: page,
      totalPages: Math.ceil(sortedHires.length / pageSize),
      totalItems: sortedHires.length,
    };
  } catch (error: any) {
    return { data: [], currentPage: 1, totalPages: 1, totalItems: 0, error: error.message || 'An error occurred' };
  }
};
export default useRecentHiresData;