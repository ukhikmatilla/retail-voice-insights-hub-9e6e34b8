
import React from 'react';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for HR dashboard charts and tables
const turnoverTrendData = [
  { month: 'Jan', hires: 10, terminations: 3 },
  { month: 'Feb', hires: 7, terminations: 5 },
  { month: 'Mar', hires: 12, terminations: 4 },
  { month: 'Apr', hires: 8, terminations: 7 },
  { month: 'May', hires: 15, terminations: 6 },
  { month: 'Jun', hires: 5, terminations: 8 },
];

const departmentData = [
  { department: 'Sales', count: 48 },
  { department: 'Marketing', count: 24 },
  { department: 'IT', count: 32 },
  { department: 'HR', count: 12 },
  { department: 'Finance', count: 20 },
];

const trainingCompletionData = [
  { name: 'Completed', value: 72 },
  { name: 'In Progress', value: 18 },
  { name: 'Not Started', value: 10 },
];

const COLORS = ['#8B5CF6', '#D3D3D3', '#F97316'];

const employeesAtRisk = [
  { id: 1, name: 'Alex Johnson', position: 'Sales Representative', issue: 'No training progress for 14 days', risk: 'high' },
  { id: 2, name: 'Maria Garcia', position: 'Customer Support', issue: 'Performance below threshold', risk: 'medium' },
  { id: 3, name: 'Wei Chen', position: 'Marketing Specialist', issue: 'Incomplete onboarding', risk: 'high' },
];

const recentHires = [
  { id: 1, name: 'Emma Wilson', position: 'Sales Manager', hireDate: '2025-03-28', progress: 45 },
  { id: 2, name: 'James Brown', position: 'IT Support', hireDate: '2025-04-02', progress: 30 },
  { id: 3, name: 'Sofia Rodriguez', position: 'Marketing Assistant', hireDate: '2025-04-10', progress: 15 },
];

const aiInsights = [
  { id: 1, insight: 'insights.aiInsight1', priority: 'high' },
  { id: 2, insight: 'insights.aiInsight2', priority: 'medium' },
  { id: 3, insight: 'insights.aiInsight3', priority: 'low' },
];

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
                {t('hr.stats.terminationsThisMonth')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">7</div>
                <UserMinus className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second row of key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('hr.stats.averageTenure')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">2.7 {t('hr.stats.years')}</div>
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
                <div className="text-2xl font-bold">82%</div>
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
                <div className="text-2xl font-bold">12</div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard Actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> {t('hr.actions.addEmployee')}
          </Button>
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" /> {t('hr.actions.assignTraining')}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> {t('hr.actions.exportReport')}
          </Button>
        </div>

        {/* Tabs for different dashboard views */}
        <Tabs defaultValue="charts" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="charts">{t('hr.tabs.charts')}</TabsTrigger>
            <TabsTrigger value="attention">{t('hr.tabs.attention')}</TabsTrigger>
            <TabsTrigger value="insights">{t('hr.tabs.insights')}</TabsTrigger>
          </TabsList>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Turnover Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('hr.turnoverTrend')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={turnoverTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="hires" stroke="#8B5CF6" name={t('hr.charts.hires')} />
                        <Line type="monotone" dataKey="terminations" stroke="#F97316" name={t('hr.charts.terminations')} />
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
                      <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8B5CF6" name={t('hr.charts.employeeCount')} />
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
                          data={trainingCompletionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {trainingCompletionData.map((entry, index) => (
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
                    {recentHires.map(employee => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t('hr.hiredOn')}: {employee.hireDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-right mb-1">{t('hr.trainingProgress')}: {employee.progress}%</div>
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${employee.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
                  {employeesAtRisk.map(employee => (
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
                        <Button size="sm">{t('hr.actions.assignCoach')}</Button>
                      </div>
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
                  {aiInsights.map(insight => (
                    <div key={insight.id} className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={
                          insight.priority === 'high' ? 'destructive' : 
                          insight.priority === 'medium' ? 'outline' : 
                          'secondary'
                        }>
                          {t(`hr.priority.${insight.priority}`)}
                        </Badge>
                      </div>
                      <p>{t(insight.insight)}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">{t('hr.actions.viewDetails')}</Button>
                        <Button size="sm">{t('hr.actions.takeAction')}</Button>
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
