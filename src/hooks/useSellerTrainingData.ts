import { useState, useEffect } from 'react';

interface Seller {
  id: string;
  name: string;
  totalModules: number;
  completedModules: number;
  progressPercent: number;
}

interface UseSellerTrainingDataResult {
  data: Seller[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  error?: string;
  loading: boolean;
}

const useSellerTrainingData = (
  sellerTrainingData: Seller[],
  searchQuery: string,
  sortBy: 'name' | 'progress',
  page: number,
  pageSize: number
): UseSellerTrainingDataResult => {
  const [data, setData] = useState<Seller[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    try {
      const generatedData = sellerTrainingData.map((seller) => ({
        ...seller,
        progressPercent: Math.floor(Math.random() * 101),
        totalModules: Math.floor(Math.random() * 6) + 5,
      }));
      const updatedData = generatedData.map((seller) => ({
        ...seller,
        completedModules: Math.floor(Math.random() * (seller.totalModules + 1)),
      }));

      let filteredData = updatedData.filter((seller) =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (sortBy === 'name') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'progress') {
        filteredData.sort((a, b) => b.progressPercent - a.progressPercent);
      }

      const total = filteredData.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalItems(total);
      setTotalPages(Math.ceil(total / pageSize));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [sellerTrainingData, searchQuery, sortBy, page, pageSize]);

  return { data, currentPage, totalPages, totalItems, error, loading };
};

export default useSellerTrainingData;