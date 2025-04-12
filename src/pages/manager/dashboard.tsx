
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">
          {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
        </h1>
        <p className="text-muted-foreground">
          {t('manager.dashboardDescription')}
        </p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t('manager.teamOverview')}</h2>
          {/* Team overview content will go here */}
          <div className="p-8 border rounded-lg text-center text-muted-foreground">
            {t('common.teamOverviewPlaceholder')}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default ManagerDashboard;
