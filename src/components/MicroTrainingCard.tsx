
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import { MicroTraining } from '@/types';
import { useNavigate } from 'react-router-dom';

interface MicroTrainingCardProps {
  microTraining: MicroTraining;
}

const MicroTrainingCard: React.FC<MicroTrainingCardProps> = ({ microTraining }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate(`/sales/training/micro/${microTraining.id}`);
  };
  
  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-amber-900">{t('training.microTitle')}</h3>
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
              {t('training.today')}
            </Badge>
          </div>
          
          <p className="text-base font-medium text-amber-800">
            {microTraining.title}
          </p>
          
          <div className="flex items-center text-sm text-amber-700">
            <Clock className="h-4 w-4 mr-1" />
            <span>~{microTraining.estimatedTime} {t('common.min')}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Button 
          onClick={handleStart}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          {t('training.start')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MicroTrainingCard;
