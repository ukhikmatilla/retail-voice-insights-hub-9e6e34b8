
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RecommendationType {
  type: 'improvement' | 'opportunity' | 'urgent';
  content: string;
}

interface AiRecommendationsProps {
  recommendations: RecommendationType[];
}

const AiRecommendations: React.FC<AiRecommendationsProps> = ({ 
  recommendations 
}) => {
  const { t } = useTranslation();

  const getTypeStyles = (type: RecommendationType['type']) => {
    switch (type) {
      case 'improvement':
        return 'bg-green-50 text-green-700';
      case 'opportunity':
        return 'bg-yellow-50 text-yellow-700';
      case 'urgent':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('conversation.recommendations.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className={`p-3 rounded-md text-sm ${getTypeStyles(rec.type)}`}>
            <p className="font-medium mb-1">{t(`conversation.recommendations.${rec.type}`)}</p>
            <p>{rec.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AiRecommendations;
