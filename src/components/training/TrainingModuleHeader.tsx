
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Training } from '@/types';

interface TrainingModuleHeaderProps {
  training: Training;
}

const TrainingModuleHeader: React.FC<TrainingModuleHeaderProps> = ({ training }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="pl-0" 
          onClick={() => navigate('/sales/training')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{training.title}</h1>
        <p className="text-muted-foreground mt-2">{training.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
            <span className="font-medium">{t('training.skill')}:</span> {t(`insights.${training.skill}`)}
          </div>
          <div className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1">
            <span className="font-medium">{t('training.level')}:</span> {training.level}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingModuleHeader;
