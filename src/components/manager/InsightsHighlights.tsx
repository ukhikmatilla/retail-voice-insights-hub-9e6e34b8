
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp } from 'lucide-react';

// Mock insights data
const mockInsights = {
  frequentMistakes: [
    {
      id: 1,
      description: 'dashboard.insights.frequentMistake1',
      severity: 'high'
    },
    {
      id: 2,
      description: 'dashboard.insights.frequentMistake2',
      severity: 'medium'
    },
  ],
  opportunities: [
    {
      id: 1,
      description: 'dashboard.insights.growthOpportunity1',
      store: 'Проспект Мира'
    },
    {
      id: 2,
      description: 'dashboard.insights.growthOpportunity2',
      store: 'Центральный'
    },
  ]
};

const InsightsHighlights: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.insights.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-insight-red">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {t('dashboard.insights.mistakes')}
          </h3>
          <div className="space-y-2">
            {mockInsights.frequentMistakes.map((mistake) => (
              <div 
                key={mistake.id} 
                className="p-3 border rounded-md bg-insight-red/10 border-insight-red/20"
              >
                <p className="text-sm">{t(mistake.description)}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    mistake.severity === 'high' ? 'bg-insight-red/20 text-insight-red' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t(`dashboard.insights.severity.${mistake.severity}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-insight-green">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('dashboard.insights.opportunities')}
          </h3>
          <div className="space-y-2">
            {mockInsights.opportunities.map((opportunity) => (
              <div 
                key={opportunity.id} 
                className="p-3 border rounded-md bg-insight-green/10 border-insight-green/20"
              >
                <p className="text-sm">{t(opportunity.description)}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {opportunity.store}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsHighlights;
