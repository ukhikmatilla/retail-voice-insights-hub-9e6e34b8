import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import ExpandableInsightCard from '@/components/insights/ExpandableInsightCard';
import StrengthsWeaknessesCard from '@/components/insights/StrengthsWeaknessesCard';
import WeeklyFocusCard from '@/components/insights/WeeklyFocusCard';
import InsightTypeChart from '@/components/insights/InsightTypeChart';
import InsightSection from '@/components/insights/InsightSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRangePicker, type DateRange } from '@/components/ui/date-range-picker';
import { MobileFiltersSheet } from '@/components/insights/MobileFiltersSheet';
import { expandableInsightsMock } from '@/data/insightsMockData';
import { 
  AreaChart, 
  BarChart,
  LineChart, 
  PieChart,
  Area,
  Pie
} from "recharts";

// Mock data for charts
const mockScoreData = [
  { name: '1 May', Score: 67 },
  { name: '8 May', Score: 70 },
  { name: '15 May', Score: 68 },
  { name: '22 May', Score: 72 },
  { name: '29 May', Score: 76 },
  { name: '5 Jun', Score: 75 },
  { name: '12 Jun', Score: 80 },
];

const mockSkillsData = [
  { name: 'Приветствие', value: 85 },
  { name: 'Выявление потребностей', value: 65 },
  { name: 'Презентация', value: 70 },
  { name: 'Работа с возражениями', value: 60 },
  { name: 'Закрытие продажи', value: 75 },
];

const mockInsightsTypeData = [
  { name: 'Улучшение', value: 45 },
  { name: 'Возможность', value: 30 },
  { name: 'Срочно', value: 15 },
  { name: 'Поведение', value: 10 },
];

const SalesInsights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2023, 4, 15),
    to: new Date(2023, 5, 15),
  });
  const [insightType, setInsightType] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.insights')}</h1>
            <p className="text-muted-foreground">{t('insights.summary.description', 'Аналитика ваших разговоров с покупателями')}</p>
          </div>

          {/* Desktop filters */}
          <div className="hidden md:flex items-center space-x-2">
            <Select value={insightType} onValueChange={setInsightType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('filters.insightType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all')}</SelectItem>
                <SelectItem value="improvement">{t('insight.type.improvement')}</SelectItem>
                <SelectItem value="opportunity">{t('insight.type.opportunity')}</SelectItem>
                <SelectItem value="urgent">{t('insight.type.urgent')}</SelectItem>
                <SelectItem value="behavior">{t('insight.type.behavior')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('filters.skill')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all')}</SelectItem>
                <SelectItem value="greeting">{t('insights.skills.greeting', 'Приветствие')}</SelectItem>
                <SelectItem value="needsDiscovery">{t('insights.skills.needsDiscovery', 'Выявление потребностей')}</SelectItem>
                <SelectItem value="presentation">{t('insights.skills.presentation', 'Презентация')}</SelectItem>
                <SelectItem value="objectionHandling">{t('insights.skills.objectionHandling', 'Работа с возражениями')}</SelectItem>
                <SelectItem value="closing">{t('insights.skills.closing', 'Закрытие продажи')}</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{t('filters.dateRange')}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile filters */}
          <div className="flex md:hidden w-full">
            <MobileFiltersSheet />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {t('insights.summary.totalInsights')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-xs text-muted-foreground mt-1">+12% {t('dashboard.thisMonth', 'в этом месяце')}</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {t('insights.summary.averageScore')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78/100</div>
              <p className="text-xs text-green-500 mt-1">+5% {t('dashboard.since', 'с')}</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {t('insights.summary.improvementRate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground mt-1">{t('dashboard.thisMonth', 'в этом месяце')}</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {t('insights.summary.weakestSkill', 'Слабый навык')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {t('insights.skills.objectionHandling', 'Работа с возражениями')}
              </div>
              <p className="text-xs text-red-500 mt-1">-2% {t('dashboard.thisMonth', 'в этом месяце')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.charts.skillProgress', 'Прогресс навыков')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  Score: { color: "#2563EB" },
                }}
                className="aspect-[4/3] sm:aspect-[16/9]"
              >
                <LineChart
                  data={mockScoreData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="Score"
                    stroke="var(--color-Score)"
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('insights.charts.skillBreakdown', 'Навыки')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { color: "#2563EB" }
                }}
                className="aspect-square sm:aspect-[4/3]"
              >
                <BarChart
                  data={mockSkillsData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('insights.charts.insightTypes', 'Типы аналитики')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    value: {
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa"
                      }
                    }
                  }}
                  className="aspect-square"
                >
                  <PieChart>
                    <Pie
                      data={mockInsightsTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <WeeklyFocusCard 
              skillKey="objectionHandling"
              context={t('insights.weeklySkillContext', 'Вы часто упускаете возможность адресовать возражения клиентов по цене и качеству.')}
              score={60}
            />
            <StrengthsWeaknessesCard 
              strengths={[
                { skillKey: "greeting", score: 85, trend: "up" },
                { skillKey: "presentation", score: 70, trend: "stable" }
              ]}
              weaknesses={[
                { skillKey: "objectionHandling", score: 60, trend: "down" },
                { skillKey: "needsDiscovery", score: 65, trend: "stable" }
              ]}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">{t('filters.all')}</TabsTrigger>
            <TabsTrigger value="improvement">{t('insight.type.improvement')}</TabsTrigger>
            <TabsTrigger value="opportunity">{t('insight.type.opportunity')}</TabsTrigger>
            <TabsTrigger value="urgent">{t('insight.type.urgent')}</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <InsightSection 
              title={t('insights.latestInsights', 'Последние инсайты')}
              insights={expandableInsightsMock}
              viewAllLink="/sales/insights/total"
            />
          </TabsContent>
          <TabsContent value="improvement" className="mt-6">
            <InsightSection 
              title={t('insights.improvements', 'Улучшения')}
              insights={expandableInsightsMock.filter(i => i.type === 'improvement')}
              viewAllLink="/sales/insights/improvement"
            />
          </TabsContent>
          <TabsContent value="opportunity" className="mt-6">
            <InsightSection 
              title={t('insights.opportunities', 'Возможности')}
              insights={expandableInsightsMock.filter(i => i.type === 'opportunity')}
              viewAllLink="/sales/insights/missed"
            />
          </TabsContent>
          <TabsContent value="urgent" className="mt-6">
            <InsightSection 
              title={t('insights.urgent', 'Срочные')}
              insights={expandableInsightsMock.filter(i => i.type === 'urgent')}
              viewAllLink="/sales/insights/improvement"
            />
          </TabsContent>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default SalesInsights;
