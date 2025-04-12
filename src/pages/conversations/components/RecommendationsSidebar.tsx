
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

interface RecommendationsSidebarProps {
  recommendations: {
    label: string;
    text: string;
    type: 'improvement' | 'opportunity' | 'urgent';
  }[];
}

const RecommendationsSidebar: React.FC<RecommendationsSidebarProps> = ({ recommendations }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{t('conversation.recommendations.title')}</h2>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">{t('conversation.recommendations.title')}</h3>
            <ul className="space-y-2 text-sm">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                    recommendation.type === 'improvement' ? 'bg-insight-green' :
                    recommendation.type === 'opportunity' ? 'bg-insight-yellow' :
                    'bg-insight-red'
                  }`} />
                  <span>{recommendation.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationsSidebar;
