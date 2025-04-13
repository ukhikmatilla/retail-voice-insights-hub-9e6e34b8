
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Headphones 
} from 'lucide-react';
import { mockAIBehaviorPatterns } from '@/utils/mockData';
import { Link } from 'react-router-dom';

const AiBehaviorHighlights: React.FC = () => {
  const { t } = useTranslation();

  const getSeverityIcon = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('insights.behavior.ai')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAIBehaviorPatterns.map((pattern) => (
            <div 
              key={pattern.id} 
              className={`rounded-lg border p-4 ${
                pattern.severity === 'critical' ? 'border-red-200 bg-red-50' :
                pattern.severity === 'warning' ? 'border-amber-200 bg-amber-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getSeverityIcon(pattern.severity)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{pattern.observation}</p>
                  
                  {(pattern.relatedTrainingModule || pattern.relatedConversationId) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pattern.relatedTrainingModule && (
                        <Button variant="outline" size="sm" className="h-8" asChild>
                          <Link to={`/sales/training/${pattern.relatedTrainingModule}`}>
                            <BookOpen className="mr-1 h-3 w-3" />
                            <span>{t('insights.viewTraining')}</span>
                          </Link>
                        </Button>
                      )}
                      
                      {pattern.relatedConversationId && (
                        <Button variant="outline" size="sm" className="h-8" asChild>
                          <Link to={`/sales/conversations/${pattern.relatedConversationId}`}>
                            <Headphones className="mr-1 h-3 w-3" />
                            <span>{t('insights.listenConversation')}</span>
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiBehaviorHighlights;
