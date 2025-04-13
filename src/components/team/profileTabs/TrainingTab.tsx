
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { TeamMemberDetails } from '@/utils/mockData/types';

interface TrainingTabProps {
  memberDetails: TeamMemberDetails;
}

export const TrainingTab: React.FC<TrainingTabProps> = ({ memberDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-1">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-medium">{t('team.progress')}</h4>
          <span className="text-sm text-muted-foreground">
            {`${memberDetails.trainingModules.filter(m => m.progress === 100).length}/${memberDetails.trainingModules.length}`}
          </span>
        </div>
        <Progress 
          value={
            (memberDetails.trainingModules.filter(m => m.progress === 100).length / 
            memberDetails.trainingModules.length) * 100
          } 
        />
      </div>
      
      <div className="space-y-4">
        {memberDetails.trainingModules.map(module => (
          <div key={module.id} className="rounded-lg border p-3">
            <h4 className="font-medium">{module.title}</h4>
            <div className="mt-2 flex items-center justify-between">
              <Progress value={module.progress} className="w-2/3" />
              <span className="text-sm text-muted-foreground">{module.progress}%</span>
            </div>
            {module.completedDate && (
              <p className="mt-2 text-xs text-muted-foreground">
                {t('training.status.completed')}: {module.completedDate}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
