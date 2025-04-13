
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, FilterIcon, LightbulbIcon } from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { expandableInsightsMock } from '@/data/insightsMockData';
import InsightTypeChart, { InsightType } from '@/components/insights/InsightTypeChart';
import InsightCard from '@/components/InsightCard';

// Mock data for insights charts
const insightTypeData = [
  { name: 'improvement' as InsightType, value: 8, fill: '#10b981' },
  { name: 'opportunity' as InsightType, value: 5, fill: '#f59e0b' },
  { name: 'urgent' as InsightType, value: 3, fill: '#ef4444' },
  { name: 'behavior' as InsightType, value: 6, fill: '#6b7280' },
  { name: 'custom' as InsightType, value: 4, fill: '#3b82f6' }
];

// Mock data for weekly trend
const weeklyTrendData = [
  { week: 'Week 1', total: 10, improvement: 4, opportunity: 3, urgent: 1, behavior: 2 },
  { week: 'Week 2', total: 12, improvement: 5, opportunity: 3, urgent: 2, behavior: 2 },
  { week: 'Week 3', total: 15, improvement: 6, opportunity: 4, urgent: 2, behavior: 3 },
  { week: 'Week 4', total: 18, improvement: 8, opportunity: 5, urgent: 3, behavior: 2 },
];

const TotalInsightsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30days');
  const [insightType, setInsightType] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  
  // Filter insights based on selected filters
  const filteredInsights = expandableInsightsMock.filter(insight => {
    if (insightType !== 'all' && insight.type !== insightType) return false;
    if (skillFilter !== 'all' && insight.skillKey !== skillFilter) return false;
    return true;
  });
  
  return (
    <RoleLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate('/sales/insights')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('insights.total.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('insights.total.description')}
            </p>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder={t('insights.filters.dateRange')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">{t('insights.filters.last7Days')}</SelectItem>
              <SelectItem value="30days">{t('insights.filters.last30Days')}</SelectItem>
              <SelectItem value="90days">{t('insights.filters.last90Days')}</SelectItem>
              <SelectItem value="custom">{t('insights.filters.custom')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={insightType} onValueChange={setInsightType}>
            <SelectTrigger className="w-[140px]">
              <FilterIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t('insights.filters.insightType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="improvement">{t('insight.type.improvement')}</SelectItem>
              <SelectItem value="opportunity">{t('insight.type.opportunity')}</SelectItem>
              <SelectItem value="urgent">{t('insight.type.urgent')}</SelectItem>
              <SelectItem value="behavior">{t('insight.type.behavior')}</SelectItem>
              <SelectItem value="custom">{t('insight.type.custom')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t('insights.filters.skill')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="trustBuilding">{t('insights.trustBuilding')}</SelectItem>
              <SelectItem value="objections">{t('insights.objections')}</SelectItem>
              <SelectItem value="crossSelling">{t('insights.crossSelling')}</SelectItem>
              <SelectItem value="valueExplanation">{t('insights.valueExplanation')}</SelectItem>
              <SelectItem value="closing">{t('insights.closing')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Insight Type Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.charts.insightTypes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <InsightTypeChart data={insightTypeData} />
            </CardContent>
          </Card>
          
          {/* Weekly Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.weeklyTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <WeeklyTrendChart data={weeklyTrendData} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Insights List */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{t('insights.insightsList')}</h3>
          <p className="text-muted-foreground mb-4">{t('insights.insightsDescription')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.length > 0 ? (
            filteredInsights.map(insight => (
              <InsightCard 
                key={insight.id} 
                insight={insight} 
                conversationId={insight.id}
                timestamp="Apr 15, 2025"
              />
            ))
          ) : (
            <div className="col-span-full p-8 text-center border rounded-lg">
              <p className="text-muted-foreground">{t('insights.noInsightsFound')}</p>
            </div>
          )}
        </div>
      </div>
    </RoleLayout>
  );
};

// Weekly Trend Chart Component
const WeeklyTrendChart = ({ data }) => {
  return (
    <div className="h-full w-full">
      {/* Using recharts */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="improvement" fill="#10b981" name="Improvement" />
          <Bar dataKey="opportunity" fill="#f59e0b" name="Opportunity" />
          <Bar dataKey="urgent" fill="#ef4444" name="Urgent" />
          <Bar dataKey="behavior" fill="#6b7280" name="Behavior" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalInsightsPage;
