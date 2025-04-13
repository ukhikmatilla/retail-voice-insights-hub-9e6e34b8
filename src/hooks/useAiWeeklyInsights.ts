import { useState, useEffect } from 'react';

interface Insight {
  id: string;
  type: 'urgent' | 'opportunity' | 'improvement';
  content: string;
}

interface UseAiWeeklyInsightsResult {
  data: Insight[];
  error: string | null;
  loading: boolean;
}

const useAiWeeklyInsights = (aiWeeklyInsights: Insight[]): UseAiWeeklyInsightsResult => {
  const [data, setData] = useState<Insight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(aiWeeklyInsights);
      } catch (err) {
        setError('Failed to load AI weekly insights');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aiWeeklyInsights]);

  return { data, error, loading };
};

export default useAiWeeklyInsights;