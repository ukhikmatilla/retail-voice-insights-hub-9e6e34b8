
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Insight } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { LightbulbIcon, AlertTriangleIcon, TrendingUpIcon } from 'lucide-react';

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const { t } = useTranslation();
  
  const getInsightDetails = () => {
    switch(insight.type) {
      case 'improvement':
        return {
          icon: <LightbulbIcon className="h-5 w-5 text-insight-green" />,
          className: 'border-l-4 border-insight-green bg-insight-green/10'
        };
      case 'opportunity':
        return {
          icon: <TrendingUpIcon className="h-5 w-5 text-insight-yellow" />,
          className: 'border-l-4 border-insight-yellow bg-insight-yellow/10'
        };
      case 'urgent':
        return {
          icon: <AlertTriangleIcon className="h-5 w-5 text-insight-red" />,
          className: 'border-l-4 border-insight-red bg-insight-red/10'
        };
      default:
        return { 
          icon: <LightbulbIcon className="h-5 w-5" />,
          className: '' 
        };
    }
  };

  const { icon, className } = getInsightDetails();

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-3 pt-0.5">
            {icon}
          </div>
          <div>
            <div className="font-medium text-sm mb-1">
              {t(`insight.type.${insight.type}`)}
            </div>
            <p className="text-sm">{insight.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
