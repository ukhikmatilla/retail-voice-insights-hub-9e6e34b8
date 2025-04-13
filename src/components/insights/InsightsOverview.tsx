
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockCommonMistakes } from '@/utils/mockData';

// Mock data for seller performance trends
const performanceTrendData = [
  { month: 'Jan', score: 6.2 },
  { month: 'Feb', score: 6.4 },
  { month: 'Mar', score: 6.7 },
  { month: 'Apr', score: 6.9 },
  { month: 'May', score: 7.2 },
  { month: 'Jun', score: 7.5 }
];

// Mock data for outcome distribution
const outcomeDistributionData = [
  { name: 'Good', value: 65, color: '#10b981' },
  { name: 'Warning', value: 25, color: '#f59e0b' },
  { name: 'Critical', value: 10, color: '#ef4444' }
];

const InsightsOverview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Common Mistakes Chart */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>{t('insights.charts.errors')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockCommonMistakes}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="type" 
                  type="category" 
                  tick={{ fontSize: 12 }}
                  width={100}
                  tickFormatter={(value) => t(`insights.mistakes.${value}`)}
                />
                <Tooltip 
                  formatter={(value) => [`${value} ${t('insights.calls')}`, t('insights.count')]}
                  labelFormatter={(value) => t(`insights.mistakes.${value}`)}
                />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Seller Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('insights.charts.trends')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 10]} />
                <Tooltip 
                  formatter={(value) => [`${value}`, t('insights.table.score')]}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Outcome Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('insights.outcomeDistribution')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {outcomeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, t('insights.percentage')]}
                  labelFormatter={(value) => t(`insights.outcome.${value.toLowerCase()}`)}
                />
                <Legend formatter={(value) => t(`insights.outcome.${value.toLowerCase()}`)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsOverview;
