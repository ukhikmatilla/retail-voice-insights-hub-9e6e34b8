
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { useMediaQuery } from '@/hooks/use-mobile';
import { AlertCircleIcon, TrendingUpIcon, LightbulbIcon, UserIcon, StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InsightType = 'improvement' | 'opportunity' | 'urgent' | 'behavior' | 'custom';

interface InsightTypeData {
  name: InsightType;
  value: number;
  fill: string;
}

interface InsightTypeChartProps {
  data: InsightTypeData[];
}

const typeColors = {
  improvement: '#10b981', // green
  opportunity: '#f59e0b', // amber
  urgent: '#ef4444',     // red
  behavior: '#6b7280',   // gray
  custom: '#3b82f6'      // blue
};

const typeIcons = {
  improvement: <TrendingUpIcon className="h-4 w-4" />,
  opportunity: <LightbulbIcon className="h-4 w-4" />,
  urgent: <AlertCircleIcon className="h-4 w-4" />,
  behavior: <UserIcon className="h-4 w-4" />,
  custom: <StarIcon className="h-4 w-4" />
};

const InsightTypeChart: React.FC<InsightTypeChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  const [period, setPeriod] = useState('30days');

  // Handle bar click to navigate to insights tab with filter
  const handleBarClick = useCallback((entry: { name: InsightType }) => {
    navigate({
      pathname: '/sales/insights',
      search: `?tab=insights&insightType=${entry.name}`
    });
  }, [navigate]);

  const renderCustomizedLabel = ({ x, y, width, value }: any) => {
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#888" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = Math.round((item.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100);
      
      return (
        <div className="bg-popover border border-border p-3 rounded-md shadow-md">
          <p className="font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.fill }} />
            {t(`insight.type.${label}`)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {item.value} {t('insights.tooltips.insightCount')} ({percentage}%)
          </p>
          <p className="text-xs mt-2 text-muted-foreground">
            {t('insights.tooltips.clickForDetails')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          {t('insights.charts.insightTypes')}
        </CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder={t('insights.filters.dateRange')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">{t('insights.filters.last7Days')}</SelectItem>
            <SelectItem value="30days">{t('insights.filters.last30Days')}</SelectItem>
            <SelectItem value="90days">{t('insights.filters.last90Days')}</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent>
        <div className={cn(
          "h-80",
          isMobile && "overflow-x-auto pb-4"
        )}>
          <ResponsiveContainer width={isMobile ? 550 : "100%"} height="80%">
            <BarChart
              data={data}
              layout={isMobile ? "vertical" : "horizontal"}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
              onClick={(data) => data && handleBarClick(data.activePayload?.[0].payload)}
            >
              {isMobile ? (
                <>
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tickFormatter={(value) => {
                      if (isSmallMobile) {
                        // Short labels for very small screens
                        return t(`insights.shortLabels.${value}`);
                      }
                      return t(`insight.type.${value}`);
                    }} 
                  />
                </>
              ) : (
                <>
                  <XAxis 
                    dataKey="name" 
                    tickFormatter={(value) => t(`insight.type.${value}`)} 
                  />
                  <YAxis />
                </>
              )}
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                cursor="pointer"
                label={isMobile ? undefined : renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
            {data.map((type) => (
              <div 
                key={type.name}
                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-accent/10 p-1 rounded transition-colors"
                onClick={() => handleBarClick({ name: type.name })}
              >
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: type.fill }}>
                  {typeIcons[type.name]}
                </div>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {t(`insight.type.${type.name}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Explanation */}
        <div className="mt-4 p-3 border bg-accent/5 rounded-md text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <LightbulbIcon className="h-4 w-4 mt-0.5 text-primary" />
            <p>{t('insights.chartExplanation', { count: data.reduce((acc, item) => acc + item.value, 0) })}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightTypeChart;
