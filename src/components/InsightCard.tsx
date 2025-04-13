
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { InsightType, Insight } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { 
  LightbulbIcon, 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  RepeatIcon, 
  WrenchIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface InsightCardProps {
  insight: Insight;
  showActions?: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  showActions = false
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
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
  
  const { icon, className } = getInsightDetails();
  
  // For long content, we'll add a show more/less toggle
  const isLongContent = insight.content && insight.content.length > 100;
  const displayContent = expanded || !isLongContent
    ? insight.content
    : `${insight.content.substring(0, 100)}...`;
  
  return (
    <Card className={cn("mb-3 overflow-hidden hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">
                {t(`insight.type.${insight.type}`)}
              </h4>
              {insight.skillKey && (
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {t(`insights.${insight.skillKey}`)}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mt-1">
                {displayContent}
              </p>
              
              {isLongContent && (
                <button 
                  className="text-xs text-primary mt-1 flex items-center"
                  onClick={toggleExpanded}
                >
                  {expanded ? (
                    <>
                      <ChevronUpIcon className="h-3 w-3 mr-1" />
                      {t('insights.hide')}
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="h-3 w-3 mr-1" />
                      {t('insights.expand')}
                    </>
                  )}
                </button>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              {insight.timestamp && (
                <p className="text-xs text-gray-500">
                  {insight.timestamp}
                </p>
              )}
              
              {showActions && (
                <div className={insight.timestamp ? "" : "ml-auto"}>
                  <Button size="sm" variant="ghost" className="text-xs h-7 px-2">
                    {t('insights.viewRelatedTraining')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
