import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { InsightType, Insight } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { LightbulbIcon, TrendingUpIcon, AlertTriangleIcon, RepeatIcon, WrenchIcon } from 'lucide-react';
interface InsightCardProps {
  insight: Insight;
}
const InsightCard: React.FC<InsightCardProps> = ({
  insight
}) => {
  const {
    t
  } = useTranslation();
  const getInsightDetails = () => {
    switch (insight.type) {
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
      case 'behavior':
        return {
          icon: <RepeatIcon className="h-5 w-5 text-gray-600" />,
          className: 'border-l-4 border-gray-400 bg-gray-100'
        };
      case 'custom':
        return {
          icon: <WrenchIcon className="h-5 w-5 text-blue-500" />,
          className: 'border-l-4 border-blue-400 bg-blue-50'
        };
      default:
        return {
          icon: <LightbulbIcon className="h-5 w-5" />,
          className: ''
        };
    }
  };
  const {
    icon,
    className
  } = getInsightDetails();
  return;
};
export default InsightCard;