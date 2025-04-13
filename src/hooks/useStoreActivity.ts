import { useState, useEffect } from 'react';

interface Store {
  id: string;
  name: string;
  location: string;
  score: number;
  status: 'danger' | 'warning' | 'good';
}

type StatusFilter = 'all' | 'danger' | 'warning' | 'good';
type SortBy = 'name' | 'score';

const useStoreActivity = (
  storeActivity: Store[],
  searchQuery: string,
  statusFilter: StatusFilter,
  sortBy: SortBy,
  page: number,
  pageSize: number
) => {
  const [data, setData] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      let filteredData = [...storeActivity];

      
      if (statusFilter !== 'all') {
        filteredData = filteredData.filter((store) => store.status === statusFilter);
      }

      
      if (searchQuery) {
        filteredData = filteredData.filter((store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      
      if (sortBy === 'name') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'score') {
        filteredData.sort((a, b) => b.score - a.score);
      }

      
      const total = filteredData.length;
      setTotalItems(total);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setData(paginatedData.map(item => ({
          ...item,
          location: `Location ${Math.floor(Math.random() * 100) + 1}`,
          score: Math.floor(Math.random() * 101),
          status: ['danger', 'warning', 'good'][Math.floor(Math.random() * 3)] as 'danger' | 'warning' | 'good'
      })));
      setCurrentPage(page);
      setTotalPages(Math.ceil(total / pageSize));
    } catch (err) {
      setError('Error fetching store activity data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [storeActivity, searchQuery, statusFilter, sortBy, page, pageSize]);

  return { data, currentPage, totalPages, totalItems, error, loading };
};

export default useStoreActivity;