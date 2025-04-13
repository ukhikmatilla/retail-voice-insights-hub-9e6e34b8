
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';
import StatCard from '@/components/StatCard';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BuildingIcon, 
  UsersIcon, 
  PhoneCallIcon, 
  BarChart3Icon,
  TargetIcon,
  BrainIcon,
  EyeIcon,
  ArrowRightIcon,
  GraduationCapIcon
} from 'lucide-react';
import { 
  mockDashboardStats, 
  mockAiWeeklyInsights, 
  mockFocusOfWeek, 
  mockStoreActivity,
  getStatusColorClass,
  getInsightColorClass 
} from '@/utils/managerDashboardMockData';
import { mockSellerTrainingData } from '@/utils/coachingMockData';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  
  // Calculate the total progress for all sellers
  const totalModules = mockSellerTrainingData().reduce((sum, seller) => sum + seller.totalModules, 0);
  const completedModules = mockSellerTrainingData().reduce((sum, seller) => sum + seller.completedModules, 0);
  const overallProgressPercent = Math.round((completedModules / totalModules) * 100) || 0;

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">
          {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
        </h1>
        
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('dashboard.stats.totalStores')}
            value={mockDashboardStats.totalStores}
            icon={<BuildingIcon className="h-4 w-4" />}
          />
          <StatCard
            title={t('dashboard.stats.totalSellers')}
            value={mockDashboardStats.totalSellers}
            icon={<UsersIcon className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title={t('dashboard.stats.totalCalls')}
            value={mockDashboardStats.totalCalls}
            icon={<PhoneCallIcon className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title={t('dashboard.stats.avgScore')}
            value={`${mockDashboardStats.avgScore}%`}
            icon={<BarChart3Icon className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* AI Weekly Insights and Focus of the Week */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Weekly Insights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BrainIcon className="h-5 w-5 mr-2" />
                {t('dashboard.aiWeeklyInsights')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAiWeeklyInsights.map((insight) => (
                  <div 
                    key={insight.id} 
                    className={`p-4 border rounded-md ${getInsightColorClass(insight.type)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{t(`insight.type.${insight.type}`)}</h3>
                      <Badge variant={insight.type === 'urgent' ? 'destructive' : insight.type === 'opportunity' ? 'secondary' : 'outline'}>
                        {t(`insight.type.${insight.type}`)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(insight.content)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Focus of the Week */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TargetIcon className="h-5 w-5 mr-2" />
                {t('dashboard.focusOfTheWeek')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-orange-50 border border-orange-100 rounded-lg text-center">
                <TargetIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">{t('dashboard.aiFocus')}</p>
                <p className="text-muted-foreground">{t(mockFocusOfWeek)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Store Activity Table */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('dashboard.storeActivity')}</CardTitle>
              <CardDescription>{t('dashboard.stats.totalStores')}: {mockDashboardStats.totalStores}</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center">
              {t('dashboard.viewAll')}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dashboard.storeName')}</TableHead>
                    <TableHead>{t('dashboard.performance')}</TableHead>
                    <TableHead>{t('dashboard.status')}</TableHead>
                    <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStoreActivity.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">
                        <div>
                          {store.name}
                          <div className="text-xs text-muted-foreground">{store.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full mr-2">
                            <div 
                              className={`h-full rounded-full ${store.status === 'danger' ? 'bg-red-500' : 
                                         store.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${store.score}%` }}
                            />
                          </div>
                          <span>{store.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColorClass(store.status)} font-normal`}>
                          {store.status === 'danger' ? t('coaching.status.needsAttention') : 
                           store.status === 'warning' ? t('coaching.status.improving') : t('coaching.status.good')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          {t('dashboard.viewAll')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 sm:hidden">
              {t('dashboard.viewAll')}
            </Button>
          </CardContent>
        </Card>
        
        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCapIcon className="h-5 w-5 mr-2" />
              {t('dashboard.training.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('coaching.sellerProgress')}</span>
                  <span className="text-sm font-medium">{completedModules}/{totalModules} ({overallProgressPercent}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${overallProgressPercent}%` }} 
                  />
                </div>
              </div>
              
              {/* Individual seller progress */}
              <div className="grid gap-4">
                {mockSellerTrainingData().slice(0, 3).map((seller) => (
                  <div key={seller.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('coaching.completedModules')}: {seller.completedModules}/{seller.totalModules}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${seller.progressPercent}%` }} 
                        />
                      </div>
                      <span className="text-sm font-medium">{seller.progressPercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                {t('dashboard.viewAll')}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
};

export default ManagerDashboard;
