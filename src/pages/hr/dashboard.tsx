
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  GraduationCap
} from 'lucide-react';

const HrDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">
          {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t('hr.dashboardDescription')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.personnelCount')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">245</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.activeEmployees')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">212</div>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.newThisMonth')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">18</div>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.trainingProgress')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">76%</div>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t('hr.workforceOverview')}</h2>
          {/* Workforce overview content will go here */}
          <div className="p-8 border rounded-lg text-center text-muted-foreground">
            {t('common.workforceOverviewPlaceholder')}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default HrDashboard;
