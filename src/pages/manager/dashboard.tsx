
import React, { useState } from 'react';
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
  useDashboardStats,
  useAiWeeklyInsights,
  useFocusOfWeek,
  useStoreActivity,
  useSellerTrainingData,
} from '@/hooks/index';
import {
  AVG_SCORE_DATA_KEY,
  TOTAL_CALLS_DATA_KEY,
  TOTAL_SELLERS_DATA_KEY,
  TOTAL_STORES_DATA_KEY,
} from '@/constants/managerDashboardDataKeys';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const [storeActivitySearchQuery, setStoreActivitySearchQuery] = useState('');
  const [storeActivityStatusFilter, setStoreActivityStatusFilter] = useState('all');
  const [storeActivitySortBy, setStoreActivitySortBy] = useState('name');
  const [storeActivityPage, setStoreActivityPage] = useState(1);
  const [storeActivityPageSize, setStoreActivityPageSize] = useState(5);
  const [sellerTrainingSearchQuery, setSellerTrainingSearchQuery] = useState('');
  const [sellerTrainingSortBy, setSellerTrainingSortBy] = useState('name');
  const [sellerTrainingPage, setSellerTrainingPage] = useState(1);
  const [sellerTrainingPageSize, setSellerTrainingPageSize] = useState(5);

  const { data: dashboardStats, error: dashboardStatsError } = useDashboardStats();
  const { data: aiWeeklyInsights, error: aiWeeklyInsightsError } = useAiWeeklyInsights();
  const { data: focusOfWeek, error: focusOfWeekError } = useFocusOfWeek();
  const {
    data: storeActivity,
    currentPage: currentStoreActivityPage,
    totalPages: totalStoreActivityPages,
    totalItems: totalStoreActivityItems,
    error: storeActivityError,
  } = useStoreActivity(
    storeActivitySearchQuery,
    storeActivityStatusFilter,
    storeActivitySortBy,
    storeActivityPage,
    storeActivityPageSize
  );
  const {
    data: sellerTrainingData,
    currentPage: currentSellerTrainingPage,
    totalPages: totalSellerTrainingPages,
    totalItems: totalSellerTrainingItems,
    error: sellerTrainingError,
  } = useSellerTrainingData(
    sellerTrainingSearchQuery,
    sellerTrainingSortBy,
    sellerTrainingPage,
    sellerTrainingPageSize
  );


  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">
          {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
        </h1>
        
        {/* Summary Stats Cards */}
        {dashboardStatsError ? (
          <p>{t('error.loadingStats')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title={t('totalStores')}
              value={dashboardStats?.[TOTAL_STORES_DATA_KEY] || 0}
              icon={<BuildingIcon className="h-4 w-4" />}
            />
            <StatCard
              title={t('totalSellers')}
              value={dashboardStats?.[TOTAL_SELLERS_DATA_KEY] || 0}
              icon={<UsersIcon className="h-4 w-4" />}
            />
            <StatCard
              title={t('totalCalls')}
              value={dashboardStats?.[TOTAL_CALLS_DATA_KEY] || 0}
              icon={<PhoneCallIcon className="h-4 w-4" />}
            />
            <StatCard
              title={t('avgScore')}
              value={`${dashboardStats?.[AVG_SCORE_DATA_KEY] || 0}%`}
              icon={<BarChart3Icon className="h-4 w-4" />}
            />
          </div>
        )}


        {/* AI Weekly Insights and Focus of the Week */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Weekly Insights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BrainIcon className="h-5 w-5 mr-2"/>
                {t('aiWeeklyInsights')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiWeeklyInsightsError ? (
                <p>{t('error.loadingInsights')}</p>
              ) : (
                <div className="space-y-4">
                  {aiWeeklyInsights?.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 border rounded-md ${
                        insight.type === 'urgent'
                          ? 'border-red-500'
                          : insight.type === 'opportunity'
                            ? 'border-yellow-500'
                            : 'border-green-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          {t(`insight.type.${insight.type}`)}
                        </h3>
                        <Badge
                          variant={
                            insight.type === 'urgent' ? 'destructive' : insight.type === 'opportunity' ? 'secondary' : 'outline'
                          }
                        >
                          {t(`insight.type.${insight.type}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t(insight.content)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TargetIcon className="h-5 w-5 mr-2"/>
                {t('focusOfTheWeek')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-orange-50 border border-orange-100 rounded-lg text-center">
                <TargetIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">{t('dashboard.aiFocus')}</p>
                <p className="text-muted-foreground">
                  {focusOfWeek ? t(focusOfWeek) : t('manager.noFocusOfWeek')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Store Activity Table */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('storeActivity')}</CardTitle>
              <CardDescription>
                {t('totalStores')}:{' '}
                {dashboardStats?.[TOTAL_STORES_DATA_KEY] !== undefined
                  ? dashboardStats[TOTAL_STORES_DATA_KEY] : t('manager.noTotalStores')}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center">
              {t('viewAll')}
              <ArrowRightIcon className="ml-2 h-4 w-4"/>
            </Button>
          </CardHeader>
          <CardContent>
            {storeActivityError ? (
              <p>{t('error.loadingStoreActivity')}</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('storeName')}</TableHead>
                      <TableHead>{t('performance')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeActivity?.map((store) => (
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
                                className={`h-full rounded-full ${
                                  store.status === 'danger' ? 'bg-red-500' :
                                  store.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{width: `${store.score}%`}}
                              />
                            </div>
                            <span>{store.score}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`font-normal ${
                              store.status === 'danger' ? 'border-red-500 text-red-500' :
                              store.status === 'warning' ? 'border-yellow-500 text-yellow-500' : 'border-green-500 text-green-500'
                            }`}
                          >
                            {t(`status.${store.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <EyeIcon className="h-4 w-4 mr-1"/>
                            {t('viewAll')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCapIcon className="h-5 w-5 mr-2"/>
              {t('training.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sellerTrainingError ? (
              <p>{t('error.loadingTrainingData')}</p>
            ) : (
              <div>
                {/*  */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
};

export default ManagerDashboard;
