
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Training } from '@/types';

interface TrainingHeaderProps {
  recommendedModule: Training;
}

const TrainingHeader: React.FC<TrainingHeaderProps> = ({ recommendedModule }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-indigo-900">{t('training.aiGoalTitle')}</h3>
            <p className="text-sm text-indigo-700 mt-1">
              {t('training.aiGoalDesc')} <span className="font-medium">{t(`insights.${recommendedModule.skill}`)}</span>
            </p>
          </div>
          <div>
            <Button>
              {t('training.start')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingHeader;
