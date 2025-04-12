
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Insight } from '@/types';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getInsightClass = () => {
    switch(insight.type) {
      case 'improvement':
        return 'insight-improvement';
      case 'opportunity':
        return 'insight-opportunity';
      case 'urgent':
        return 'insight-urgent';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("mb-3 overflow-hidden", getInsightClass())}>
      <CardContent className="p-4">
        <p>{insight.content}</p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
