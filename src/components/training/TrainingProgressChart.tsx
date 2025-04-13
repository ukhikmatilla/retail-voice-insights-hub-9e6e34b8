
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TrainingProgressChartProps {
  data: {
    week: string;
    completed: number;
    inProgress: number;
  }[];
}

const TrainingProgressChart: React.FC<TrainingProgressChartProps> = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('training.progressTitle', 'Your Learning Progress')}</CardTitle>
        <CardDescription>{t('training.progressDesc', 'Track your completed and in-progress modules')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#8884d8" 
                name={t('training.completed')} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                stroke="#82ca9d" 
                name={t('training.inProgress')} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProgressChart;
