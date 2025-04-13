
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import TrainingModuleCard from '@/components/TrainingModuleCard';
import { Training } from '@/types';

interface TrainingModuleListProps {
  modules: Training[];
}

const TrainingModuleList: React.FC<TrainingModuleListProps> = ({ modules }) => {
  const { t } = useTranslation();
  
  if (modules.length === 0) {
    return (
      <Card className="p-8 text-center mb-8">
        <p className="text-muted-foreground">{t('sales.noTrainingModules')}</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {modules.map(module => (
        <TrainingModuleCard 
          key={module.id} 
          training={module}
        />
      ))}
    </div>
  );
};

export default TrainingModuleList;
