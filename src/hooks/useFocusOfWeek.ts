import { useState, useEffect } from 'react';

interface UseFocusOfWeekResult {
  data: string;
  error: string | null;
  loading: boolean;
}

const useFocusOfWeek = (focusOfWeek: string): UseFocusOfWeekResult => {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!focusOfWeek) {
          throw new Error('Focus of the week is not provided.');
        }
        setData(focusOfWeek);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [focusOfWeek]);

  return { data, error, loading };
};

export default useFocusOfWeek;