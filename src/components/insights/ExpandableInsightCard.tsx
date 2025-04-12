
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LightbulbIcon, 
  TrendingUpIcon, 
  AlertCircleIcon, 
  RepeatIcon, 
  StarIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { InsightType } from '@/types';

interface ExpandableInsightCardProps {
  id: string;
  type: InsightType;
  content: string;
  timestamp?: string;
  skillKey?: string;
}

export const ExpandableInsightCard: React.FC<ExpandableInsightCardProps> = ({
  type,
  content,
  timestamp,
  skillKey
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get the appropriate styling and icon based on the insight type
  const getInsightDetails = () => {
    switch(type) {
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
          icon: <AlertCircleIcon className="h-5 w-5 text-insight-red" />,
          className: 'border-l-4 border-insight-red bg-insight-red/10'
        };
      case 'behavior':
        return {
          icon: <RepeatIcon className="h-5 w-5 text-gray-600" />,
          className: 'border-l-4 border-gray-400 bg-gray-100'
        };
      case 'custom':
        return {
          icon: <StarIcon className="h-5 w-5 text-blue-500" />,
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

  return (
    <Card className={cn("overflow-hidden transition-all duration-300", className)}>
      <div 
        className="p-4 cursor-pointer" 
        onClick={toggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="mr-3 pt-0.5">
              {icon}
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {t(`insight.type.${type}`)}
              </h3>
              {!isExpanded && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {content}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {timestamp && (
              <span className="text-xs text-muted-foreground mr-2">
                {timestamp}
              </span>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {isExpanded ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-4 animate-accordion-down">
          <p className="text-sm mb-2">{content}</p>
          
          {skillKey && (
            <div className="mt-2 text-xs">
              <span className="text-primary font-medium">
                {t(`insights.${skillKey}`)}
              </span>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs h-7" 
            onClick={toggleExpand}
          >
            {t('insights.hide')}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ExpandableInsightCard;
