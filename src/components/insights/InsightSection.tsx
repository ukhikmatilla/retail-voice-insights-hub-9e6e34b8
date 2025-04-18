
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Insight, InsightType } from '@/types';
import ExpandableInsightCard from './ExpandableInsightCard';

interface InsightSectionProps {
  insights: Insight[];
}

export const InsightSection: React.FC<InsightSectionProps> = ({ insights }) => {
  const { t } = useTranslation();
  
  // Group insights by type
  const groupedInsights = {
    urgent: insights.filter(i => i.type === "urgent"),
    improvement: insights.filter(i => i.type === "improvement"),
    opportunity: insights.filter(i => i.type === "opportunity"),
    behavior: insights.filter(i => i.type === "behavior"),
    custom: insights.filter(i => i.type === "custom")
  };

  // Colors for section headings
  const getSectionColor = (type: InsightType) => {
    switch(type) {
      case 'improvement': return 'text-insight-green';
      case 'opportunity': return 'text-insight-yellow';
      case 'urgent': return 'text-insight-red';
      case 'behavior': return 'text-gray-600';
      case 'custom': return 'text-blue-600';
      default: return '';
    }
  };

  // Render a section for each type if insights exist
  const renderSection = (type: InsightType) => {
    const insightsForType = groupedInsights[type];
    
    if (insightsForType.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className={`text-md font-semibold mb-3 ${getSectionColor(type)}`}>
          {t(`insight.type.${type}`)} ({insightsForType.length})
        </h3>
        <div className="space-y-3">
          {insightsForType.map(insight => (
            <ExpandableInsightCard 
              key={insight.id}
              id={insight.id}
              type={insight.type}
              content={insight.content}
              timestamp={insight.timestamp}
              skillKey={insight.skillKey}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {/* Critical/Urgent insights - shown first for priority */}
      {renderSection('urgent')}
      
      {/* Improvement insights */}
      {renderSection('improvement')}
      
      {/* Opportunity insights */}
      {renderSection('opportunity')}
      
      {/* Behavior insights */}
      {renderSection('behavior')}
      
      {/* Custom insights */}
      {renderSection('custom')}
      
      {/* Empty state when no insights are available */}
      {insights.length === 0 && (
        <div className="p-8 text-center text-muted-foreground bg-muted rounded-lg">
          {t('sales.noAnalysisAvailable')}
        </div>
      )}
    </div>
  );
};

export default InsightSection;
