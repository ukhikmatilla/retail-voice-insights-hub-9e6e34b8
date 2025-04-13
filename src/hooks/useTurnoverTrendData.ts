import { useState, useEffect } from 'react';

interface TurnoverTrend {
  month: string;
  hires: number;
  terminations: number;
  date?: Date;
}

type DateRange = '7days' | '30days' | '90days' | 'custom';

type TurnoverTrendDataResult = TurnoverTrend[] | { error: string };

const useTurnoverTrendData = (turnoverTrendData: TurnoverTrend[], dateRange: DateRange): TurnoverTrendDataResult => {
  const [data, setData] = useState<TurnoverTrend[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const today = new Date();
      let startDate: Date;

      switch (dateRange) {
        case '7days':
          startDate = new Date(today.setDate(today.getDate() - 7));
          break;
        case '30days':
          startDate = new Date(today.setDate(today.getDate() - 30));
          break;
        case '90days':
          startDate = new Date(today.setDate(today.getDate() - 90));
          break;
        case 'custom':
        default:
          startDate = new Date(0);
          break;
      }

      const parsedData = turnoverTrendData.map(item => ({ ...item, date: new Date(2025, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].indexOf(item.month), 1) }));
      setData(parsedData.filter(item => item.date! >= startDate));
      setError(null);
    } catch (e: any) {
      setError("Ошибка при обработке данных Turnover Trend: " + e.message);
    }
  }, [turnoverTrendData, dateRange]);

  return error ? { error } : data;
};

export default useTurnoverTrendData;