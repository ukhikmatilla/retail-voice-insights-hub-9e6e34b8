
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrainingResultProps {
  score: number;
  completed: boolean;
  earnedBadges: string[];
  feedback: string;
  onRetry: () => void;
}

const TrainingResult: React.FC<TrainingResultProps> = ({
  score,
  completed,
  earnedBadges,
  feedback,
  onRetry,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleBackToTraining = () => {
    navigate('/sales/training');
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {completed ? <CheckCircle className="text-green-600 h-5 w-5" /> : null}
          {t('training.moduleResult')}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="text-center py-4">
          <div className={`text-4xl font-bold mb-3 ${score >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
            {score}%
          </div>
          
          {completed ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {t('training.completed')}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {t('training.needsImprovement')}
            </Badge>
          )}
          
          {feedback && (
            <div className="mt-6 p-4 bg-muted rounded-md text-left">
              <p className="text-sm">{feedback}</p>
            </div>
          )}
          
          {earnedBadges.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">{t('training.earnedBadges')}</h4>
              <div className="flex justify-center gap-2 flex-wrap">
                {earnedBadges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <span className="text-xs mt-1">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackToTraining}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('training.backToTraining')}
        </Button>
        
        {!completed && (
          <Button onClick={onRetry}>{t('training.retryModule')}</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrainingResult;
