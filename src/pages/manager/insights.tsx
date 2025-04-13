
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import InsightsOverview from '@/components/insights/InsightsOverview';
import AiBehaviorHighlights from '@/components/insights/AiBehaviorHighlights';
import StorePerformanceTable from '@/components/insights/StorePerformanceTable';
import SellerLeaderboard from '@/components/insights/SellerLeaderboard';
import InsightsFilterPanel from '@/components/insights/InsightsFilterPanel';

const ManagerInsights = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('manager.insights')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('manager.insightsDescription')}
          </p>
        </div>
        
        {/* Filters and Export */}
        <InsightsFilterPanel />
        
        {/* Overview Charts */}
        <InsightsOverview />
        
        {/* AI Behavior Patterns */}
        <AiBehaviorHighlights />
        
        {/* Store Performance Table */}
        <StorePerformanceTable />
        
        {/* Seller Leaderboard */}
        <SellerLeaderboard />
      </div>
    </RoleLayout>
  );
};

export default ManagerInsights;
