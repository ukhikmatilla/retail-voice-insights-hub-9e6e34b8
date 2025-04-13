import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserPlus,
  UserMinus,
  GraduationCap,
  Clock,
  BookOpen,
  Download,
  BrainCircuit
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { hrMockData } from '@/data/hrMockData';
import { COLORS } from '@/data/mockData';
import { useTurnoverTrendData, TurnoverTrendData } from '@/hooks/useTurnoverTrendData';
import { useDepartmentData } from '@/hooks/useDepartmentData';
import { useTrainingCompletionData } from '@/hooks/useTrainingCompletionData';
import { useEmployeesAtRiskData } from '@/hooks/useEmployeesAtRiskData';
import { useRecentHiresData } from '@/hooks/useRecentHiresData';
import { FilterSelector } from '@/components/FilterSelector';

const HrDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const [dateRange, setDateRange] = useState<"7days" | "30days" | "90days" | "custom">("7days");
  const [riskFilter, setRiskFilter] = useState<"all" | "high" | "medium" | "low">("all");

  // Pagination state
  const [employeesAtRiskPage, setEmployeesAtRiskPage] = useState(1);
  const [recentHiresPage, setRecentHiresPage] = useState(1);
  const [pageSize] = useState(5);

  // Fetch data using hooks
  const turnoverTrendDataResult = useTurnoverTrendData(hrMockData.turnoverTrendData, dateRange);
  const departmentDataResult = useDepartmentData(hrMockData.departmentData);
  const trainingCompletionDataResult = useTrainingCompletionData(hrMockData.trainingCompletionData);
  const employeesAtRiskDataResult = useEmployeesAtRiskData(hrMockData.employeesAtRisk, riskFilter, 'risk', employeesAtRiskPage, pageSize);
  const recentHiresDataResult = useRecentHiresData(hrMockData.recentHires, 'hireDate', recentHiresPage, pageSize);

  // Extract data and pagination info
  const turnoverTrendData = useMemo(() => turnoverTrendDataResult && "data" in turnoverTrendDataResult ? turnoverTrendDataResult.data : [], [turnoverTrendDataResult]) as TurnoverTrendData[];
  const departmentData = useMemo(() => departmentDataResult && "data" in departmentDataResult ? departmentDataResult.data : [], [departmentDataResult]) as { department: string; count: number }[];
  const trainingCompletionData = useMemo(() => trainingCompletionDataResult && "data" in trainingCompletionDataResult ? trainingCompletionDataResult.data : [], [trainingCompletionDataResult]) as { name: string; value: number }[];
  const employeesAtRiskData = useMemo(() => employeesAtRiskDataResult && "data" in employeesAtRiskDataResult ? employeesAtRiskDataResult.data : [], [employeesAtRiskDataResult]) as { id: number; name: string; position: string; issue: string; risk: string }[];
  const recentHiresData = useMemo(() => recentHiresDataResult && "data" in recentHiresDataResult ? recentHiresDataResult.data : [], [recentHiresDataResult]) as { id: number; name: string; position: string; hireDate: string; progress: number }[];
  
  // Extract pagination information
  const employeesAtRiskCurrentPage = useMemo(() => employeesAtRiskDataResult && "currentPage" in employeesAtRiskDataResult ? employeesAtRiskDataResult.currentPage : 1, [employeesAtRiskDataResult]);
  const employeesAtRiskTotalPages = useMemo(() => employeesAtRiskDataResult && "totalPages" in employeesAtRiskDataResult ? employeesAtRiskDataResult.totalPages : 1, [employeesAtRiskDataResult]);
  const employeesAtRiskTotalItems = useMemo(() => employeesAtRiskDataResult && "totalItems" in employeesAtRiskDataResult ? employeesAtRiskDataResult.totalItems : 0, [employeesAtRiskDataResult]);

  const recentHiresCurrentPage = useMemo(() => recentHiresDataResult && "currentPage" in recentHiresDataResult ? recentHiresDataResult.currentPage : 1, [recentHiresDataResult]);
  const recentHiresTotalPages = useMemo(() => recentHiresDataResult && "totalPages" in recentHiresDataResult ? recentHiresDataResult.totalPages : 1, [recentHiresDataResult]);
  const recentHiresTotalItems = useMemo(() => recentHiresDataResult && "totalItems" in recentHiresDataResult ? recentHiresDataResult.totalItems : 0, [recentHiresDataResult]);
  

    const hasErrors = useMemo(() => {
    return !!(
      "error" in turnoverTrendDataResult ||
      "error" in departmentDataResult ||
      "error" in trainingCompletionDataResult ||
      "error" in employeesAtRiskDataResult ||
      "error" in recentHiresDataResult
    );
  }, [turnoverTrendDataResult, departmentDataResult, trainingCompletionDataResult, employeesAtRiskDataResult, recentHiresDataResult]);
  
  if (hasErrors) {
    return (
      <RoleLayout currentPath={location.pathname}>
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('hr.dashboardDescription')}
          </p>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{t('common.error')}</strong>
            { "error" in turnoverTrendDataResult && <span className="block sm:inline"> {t('hr.errors.turnoverTrend')}: {t(turnoverTrendDataResult.error)}</span> }
            { "error" in departmentDataResult && <span className="block sm:inline"> {t('hr.errors.department')}: {t(departmentDataResult.error)}</span> }
            { "error" in trainingCompletionDataResult && <span className="block sm:inline"> {t('hr.errors.trainingCompletion')}: {t(trainingCompletionDataResult.error)}</span> }
            { "error" in employeesAtRiskDataResult && <span className="block sm:inline"> {t('hr.errors.employeesAtRisk')}: {t(employeesAtRiskDataResult.error)}</span> }
            { "error" in recentHiresDataResult && <span className="block sm:inline"> {t('hr.errors.recentHires')}: {t(recentHiresDataResult.error)}</span> }
          </div>
        </div>
      </RoleLayout>
    );

  const handleRiskFilterChange = (value: string) => {
    setRiskFilter(value as "all" | "high" | "medium" | "low");
  };

  const generatePieChartLabel = ({ name, percent }: { name: string; percent: number }) => {
    const translatedName = t(`hr.training.${name}`);
    return `${translatedName}: ${(percent * 100).toFixed(0)}%`;
  };
  
  const handleEmployeesAtRiskPageChange = (page: number) => {
    setEmployeesAtRiskPage(page);
  };

  const handleRecentHiresPageChange = (page: number) => {
    setRecentHiresPage(page);
  };

  const formatTableDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('common.locale'), { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderRecentHire = (employee: { id: number; name: string; position: string; hireDate: string; progress: number }) => (
    <div key={employee.id} className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <div className="font-medium">{employee.name}</div>
        <div className="text-sm text-muted-foreground">{employee.position}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {t('hr.hiredOn')}: {formatTableDate(employee.hireDate)}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-muted-foreground mb-1">{t('hr.trainingProgress')}: {employee.progress}%</div>
        <div className="w-24 h-2 bg-muted rounded-full">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${employee.progress}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderEmployeeAtRisk = (employee: { id: number; name: string; position: string; issue: string; risk: string }) => (
    <div key={employee.id} className="flex items-start justify-between p-4 border rounded-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{employee.name}</span>
          <Badge variant={employee.risk === 'high' ? 'destructive' : 'outline'}>
            {t(`hr.risk.${employee.risk}`)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">{employee.position}</div>
        <div className="text-sm mt-2">{employee.issue}</div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">{t('hr.actions.message')}</Button>
        <Button size="sm" >{t('hr.actions.assignCoach')}</Button>
      </div>
    </div>
  );

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">
          {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t('hr.dashboardDescription')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <FilterSelector<"7days" | "30days" | "90days" | "custom">
            value={dateRange}
            onValueChange={setDateRange}
            placeholder={t('common.dateRange')}
            options={useMemo(() => [
              { value: '7days', label: t('common.last7Days') },
              { value: '30days', label: t('common.last30Days') },
              { value: '90days', label: t('common.last90Days') },
              { value: 'custom', label: t('common.custom') }
            ]}
          />
          , [t])}
          <FilterSelector<"all" | "high" | "medium" | "low">
            value={riskFilter}
            onValueChange={handleRiskFilterChange}
            onValueChange={() => {}}
            placeholder={t('hr.risk.filter')}
            options={[
              { value: 'all', label: t('common.all') },
              { value: 'high', label: t('hr.risk.high') },
              { value: 'medium', label: t('hr.risk.medium') },
              { value: 'low', label: t('hr.risk.low') },
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.personnelCount')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.personnelCount}</div>
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
                <div className="text-2xl font-bold">{hrMockData.activeEmployees}</div>
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
                <div className="text-2xl font-bold">{hrMockData.newHires}</div>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.terminationsThisMonth')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.terminations}</div>
                <UserMinus className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.trainingProgress')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.trainingProgress}%</div>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.averageTenure')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.averageTenure} {t('hr.stats.years')}</div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.adaptationLevel')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.adaptationLevel}%</div>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.requiredTraining')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{hrMockData.requiredTraining}</div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> {t('hr.actions.addEmployee')}
          </Button>
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" /> {t('hr.actions.assignTraining')}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> {t('hr.actions.exportReport')}
          </Button>

        <Tabs defaultValue="charts" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="attention">{t('hr.tabs.attention')}</TabsTrigger>
            <TabsTrigger value="insights">{t('hr.tabs.insights')}</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Turnover Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('hr.turnoverTrend')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]" style={{ minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={turnoverTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                </CardContent>
                        <Line type="monotone" dataKey={TERMINATIONS_DATA_KEY} stroke="#F97316" name={t('hr.charts.terminations')} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Department Breakdown Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('hr.departmentBreakdown')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hrMockData.departmentData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="department"/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8b5cf6" name={t('hr.charts.employeeCount')}/>
                      </BarChart>
                    </ResponsiveContainer>  
                  </div>
                </CardContent>
              </Card>

              {/* Training Completion Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('hr.stats.trainingDistribution')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hrMockData.trainingCompletionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={generatePieChartLabel}
                        >
                          {hrMockData.trainingCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Hires Table */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('hr.recentHires')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentHiresData.map(renderRecentHire)}
                    {recentHiresTotalItems > pageSize && (
                      <div className="flex justify-center mt-4">
                          <Paginator
                            currentPage={recentHiresCurrentPage}
                            totalPages={recentHiresTotalPages}
                            onPageChange={handleRecentHiresPageChange}
                            totalItems={recentHiresTotalItems}
                            pageSize={pageSize}
                          />
                        
                        
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* HR Attention Tab */}
          <TabsContent value="attention">
            <Card>
              <CardHeader>
                <CardTitle>{t('hr.attentionRequired')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    {employeesAtRiskData.map(renderEmployeeAtRisk)}
                    {employeesAtRiskTotalItems > pageSize && (
                      <div className="flex justify-center mt-4">
                          <Paginator
                            currentPage={employeesAtRiskCurrentPage}
                            totalPages={employeesAtRiskTotalPages}
                            onPageChange={handleEmployeesAtRiskPageChange}
                            totalItems={employeesAtRiskTotalItems}
                            pageSize={pageSize}
                          />
                      
                        
                      </div>
                    )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <BrainCircuit className="h-5 w-5 mr-2" />
                <CardTitle>{t('hr.aiInsights')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hrMockData.aiInsights.map(insight => (
                    <div key={insight[ID_DATA_KEY]} className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={
                          insight[PRIORITY_DATA_KEY] === HIGH_RISK_TEXT ? 'destructive' : 
                            insight[PRIORITY_DATA_KEY] === MEDIUM_RISK_TEXT ? 'outline' :
                              'secondary'
                        }>
                          {t(`hr.priority.${insight[PRIORITY_DATA_KEY]}`)}
                        </Badge>
                      </div>
                      <p>{t(insight[INSIGHT_DATA_KEY])}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">{t('hr.actions.viewdetails')}</Button>
                        <Button size="sm">{t('hr.actions.takeaction')}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default HrDashboard;

const Paginator: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; totalItems: number; pageSize: number }> = ({ currentPage, totalPages, onPageChange, totalItems, pageSize }) => {
    const { t } = useTranslation();
  
    const getPageNumbers = () => {
      const pagesToShow = 5;
      const halfWay = Math.ceil(pagesToShow / 2);
      const isStart = currentPage <= halfWay;
      const isEnd = totalPages - currentPage < halfWay;
  
      let startPage = 1;
      let endPage = Math.min(totalPages, pagesToShow);
  
      if (!isStart && !isEnd) {
        startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        endPage = Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2));
      } else if (isEnd) {
        startPage = Math.max(1, totalPages - pagesToShow + 1);
        endPage = totalPages;
      }
  
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t('pagination.showing', { min: Math.min((currentPage - 1) * pageSize + 1, totalItems), max: Math.min(currentPage * pageSize, totalItems), total: totalItems })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('pagination.previous')}
          </Button>
  
          {pageNumbers.map(page => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
  
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('pagination.next')}
          </Button>
        </div>
      </div>
    );
  };
