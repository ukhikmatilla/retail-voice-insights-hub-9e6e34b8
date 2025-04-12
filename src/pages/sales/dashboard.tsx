
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';
import { Card } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import ConversationCard from '@/components/ConversationCard';
import InsightCard from '@/components/InsightCard';
import TrainingModuleCard from '@/components/TrainingModuleCard';
import { 
  BarChart3Icon, 
  PercentIcon, 
  AlertCircleIcon, 
  CheckCircleIcon 
} from 'lucide-react';

import { mockSalespersonStats, mockConversations, mockTrainings } from '@/data/mockData';

const SalesDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">
            {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('sales.dashboardDescription')}
          </p>
        </div>
        
        {/* Stats Section */}
        <section>
          <h2 className="text-xl font-semibold mb-3">{t('dashboard.stats.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title={t('dashboard.stats.totalConversations')} 
              value={mockSalespersonStats.totalConversations} 
              icon={<BarChart3Icon />} 
              trend={{ value: 8, isPositive: true }} 
            />
            <StatCard 
              title={t('dashboard.stats.averageScore')} 
              value={mockSalespersonStats.averageScore + '%'} 
              icon={<PercentIcon />} 
              trend={{ value: 3, isPositive: true }} 
            />
            <StatCard 
              title={t('dashboard.stats.missedOpportunities')} 
              value={mockSalespersonStats.missedOpportunities} 
              icon={<AlertCircleIcon />} 
              trend={{ value: 5, isPositive: false }} 
            />
            <StatCard 
              title={t('dashboard.stats.successRate')} 
              value={mockSalespersonStats.successRate + '%'} 
              icon={<CheckCircleIcon />} 
              trend={{ value: 2, isPositive: true }} 
            />
          </div>
        </section>
        
        {/* Recent Conversations */}
        <section>
          <h2 className="text-xl font-semibold mb-3">{t('sales.recentConversations')}</h2>
          {mockConversations.length > 0 ? (
            <div className="space-y-4">
              {mockConversations.slice(0, 3).map(conversation => (
                <ConversationCard 
                  key={conversation.id} 
                  conversation={conversation} 
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              {t('sales.noConversations')}
            </Card>
          )}
        </section>
        
        {/* Training Modules */}
        <section>
          <h2 className="text-xl font-semibold mb-3">{t('sales.trainingModules')}</h2>
          {mockTrainings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTrainings.slice(0, 3).map(training => (
                <TrainingModuleCard 
                  key={training.id} 
                  training={training} 
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              {t('sales.noTrainingModules')}
            </Card>
          )}
        </section>
        
        {/* Weekly Insights Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-3">{t('sales.weeklyInsights')}</h2>
          <div className="space-y-3">
            {mockConversations.length > 0 ? 
              mockConversations.slice(0, 2).flatMap(conv => 
                conv.insights.slice(0, 1).map(insight => (
                  <InsightCard key={insight.id} insight={insight} />
                ))
              ) : (
                <Card className="p-8 text-center text-muted-foreground">
                  {t('sales.noInsights')}
                </Card>
              )
            }
          </div>
        </section>
      </div>
    </RoleLayout>
  );
};

export default SalesDashboard;
