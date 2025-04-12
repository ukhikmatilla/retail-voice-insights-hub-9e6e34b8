
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Training } from '@/types';
import { format, isAfter } from 'date-fns';

interface TrainingModuleCardProps {
  training: Training;
}

const TrainingModuleCard: React.FC<TrainingModuleCardProps> = ({ training }) => {
  const { t } = useTranslation();
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'assigned':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'inProgress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  // Calculate if training is overdue
  const isOverdue = () => {
    if (!training.dueDate) return false;
    
    const dueDate = new Date(training.dueDate);
    const today = new Date();
    
    return isAfter(today, dueDate) && training.status !== 'completed';
  };
  
  const getProgress = () => {
    if (training.status === 'inProgress') return 50; // Mock progress
    if (training.status === 'completed') return 100;
    return 0;
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-5 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{training.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(training.status)}`}>
            {t(`training.status.${training.status}`)}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {training.description}
        </p>
        
        {training.dueDate && (
          <div className="text-xs text-muted-foreground">
            {isOverdue() ? (
              <span className="text-destructive font-medium">
                {t('training.overdue')}: {format(new Date(training.dueDate), 'PP')}
              </span>
            ) : (
              <span>
                {t('training.dueDate')}: {format(new Date(training.dueDate), 'PP')}
              </span>
            )}
          </div>
        )}
        
        {training.status === 'inProgress' && (
          <div className="mt-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-right text-muted-foreground">
              {getProgress()}% {t('training.complete')}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 py-3 border-t bg-muted/50">
        <Button variant="secondary" size="sm" className="w-full">
          {training.status === 'completed' 
            ? t('training.viewCertificate') 
            : training.status === 'inProgress' 
              ? t('training.continue') 
              : t('training.start')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingModuleCard;
