import { EmployeeAtRisk } from '@/types';

type RiskFilter = 'all' | 'high' | 'medium' | 'low';
type SortBy = 'name' | 'risk';

type EmployeeAtRiskDataResult = EmployeeAtRisk[] | { error: string };

interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  error?: string;
}

type UseEmployeesAtRiskData = (
  employeesAtRisk: EmployeeAtRisk[],
  riskFilter: RiskFilter,
  sortBy: SortBy,
  page: number,
  pageSize: number
) => PaginatedResult<EmployeeAtRisk>;

const useEmployeesAtRiskData: UseEmployeesAtRiskData = (
  employeesAtRisk,
  riskFilter,
  sortBy,
  page,
  pageSize
) => {
  try {
    let filteredData = [...employeesAtRisk];
    if (riskFilter !== 'all') {
      filteredData = filteredData.filter((employee) => employee.risk === riskFilter);
    }
    filteredData.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'risk') {
        const riskOrder = { high: 1, medium: 2, low: 3 };
        return (riskOrder[a.risk] || 4) - (riskOrder[b.risk] || 4);
      } else {
        return 0;
      }
    });
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return {
      }
      return 0;
    });

    return filteredData;
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(filteredData.length / pageSize),
      totalItems: filteredData.length,
    };
  }
};
export default useEmployeesAtRiskData;