
import React from 'react';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import SkillFeedbackAccordion from '@/components/ai/SkillFeedbackAccordion';
import InsightCard from '@/components/InsightCard';
import { useTranslation } from 'react-i18next';
import { Insight } from '@/types';

interface InsightsTabContentProps {
  skills: any[];
  groupedInsights: {
    urgent: Insight[];
    improvement: Insight[];
    opportunity: Insight[];
    behavior: Insight[];
    custom: Insight[];
  };
}

const InsightsTabContent: React.FC<InsightsTabContentProps> = ({ 
  skills,
  groupedInsights
}) => {
  const { t } = useTranslation();
  
  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <SkillFeedbackAccordion skills={skills} />
        </CardContent>
      </Card>
      
      {/* Critical/Urgent insights - shown first for priority */}
      {groupedInsights.urgent.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-insight-red">
            {t('insight.type.urgent')} ({groupedInsights.urgent.length})
          </h3>
          <div className="space-y-3">
            {groupedInsights.urgent.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Improvement insights */}
      {groupedInsights.improvement.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-insight-green">
            {t('insight.type.improvement')} ({groupedInsights.improvement.length})
          </h3>
          <div className="space-y-3">
            {groupedInsights.improvement.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Opportunity insights */}
      {groupedInsights.opportunity.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-insight-yellow">
            {t('insight.type.opportunity')} ({groupedInsights.opportunity.length})
          </h3>
          <div className="space-y-3">
            {groupedInsights.opportunity.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Behavior insights */}
      {groupedInsights.behavior.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-gray-600">
            {t('insight.type.behavior')} ({groupedInsights.behavior.length})
          </h3>
          <div className="space-y-3">
            {groupedInsights.behavior.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Custom insights */}
      {groupedInsights.custom.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-blue-600">
            {t('insight.type.custom')} ({groupedInsights.custom.length})
          </h3>
          <div className="space-y-3">
            {groupedInsights.custom.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty state when no insights are available */}
      {Object.values(groupedInsights).every(group => group.length === 0) && (
        <Card className="p-8 text-center text-muted-foreground">
          {t('sales.noAnalysisAvailable')}
        </Card>
      )}
    </>
  );
};

export default InsightsTabContent;
