import { useState, useEffect } from 'react';

interface DashboardStats {
  totalStores: number;
  totalSellers: number;
  totalCalls: number;
  avgScore: number;
}

interface UseDashboardStatsResult {
  data: DashboardStats | null;
  error: string | null;
  loading: boolean;
}

const useDashboardStats = (dashboardStats: DashboardStats[]): UseDashboardStatsResult => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!dashboardStats || dashboardStats.length === 0) {
          throw new Error('No dashboard stats data available.');
        }
        setData(dashboardStats[0]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dashboardStats]);

  return { data, error, loading };
};

export default useDashboardStats;