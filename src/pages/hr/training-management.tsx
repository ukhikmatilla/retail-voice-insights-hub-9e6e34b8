
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';

const HrTrainingManagement = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">{t('hr.trainingManagement')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('hr.trainingManagementDescription')}
        </p>
        
        <div className="p-8 border rounded-lg text-center text-muted-foreground">
          {t('common.trainingManagementPlaceholder')}
        </div>
      </div>
    </RoleLayout>
  );
};

export default HrTrainingManagement;
