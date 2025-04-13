
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';
import GeneralStats from '@/components/manager/GeneralStats';
import InsightsHighlights from '@/components/manager/InsightsHighlights';
import AiWeeklyFocus from '@/components/manager/AiWeeklyFocus';
import StoreActivityTable from '@/components/manager/StoreActivityTable';
import TrainingStats from '@/components/manager/TrainingStats';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
          </h1>
          <p className="text-muted-foreground">
            {t('manager.dashboardDescription')}
          </p>
        </div>
        
        {/* General Statistics */}
        <GeneralStats />
        
        {/* Main content in two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <InsightsHighlights />
            <StoreActivityTable />
          </div>
          
          {/* Right side - 1/3 width */}
          <div className="space-y-6">
            <AiWeeklyFocus />
            <TrainingStats />
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default ManagerDashboard;
