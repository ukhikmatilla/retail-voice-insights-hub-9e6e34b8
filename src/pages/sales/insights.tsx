import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  BarChart3,
  Calendar,
  FilterIcon,
  LightbulbIcon,
  TrendingUpIcon,
  BadgeCheckIcon
} from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import InsightCard from '@/components/InsightCard';
import { expandableInsightsMock } from '@/data/insightsMockData';
import StrengthsWeaknessesCard from '@/components/insights/StrengthsWeaknessesCard';
import WeeklyFocusCard from '@/components/insights/WeeklyFocusCard';
import InsightTypeChart, { InsightType } from '@/components/insights/InsightTypeChart';
import { 
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

// Mock data for insights charts and strengths/weaknesses
const insightTypeData = [
  { name: 'improvement' as InsightType, value: 8, fill: '#10b981' },
  { name: 'opportunity' as InsightType, value: 5, fill: '#f59e0b' },
  { name: 'urgent' as InsightType, value: 3, fill: '#ef4444' },
  { name: 'behavior' as InsightType, value: 6, fill: '#6b7280' },
  { name: 'custom' as InsightType, value: 4, fill: '#3b82f6' }
];

// Mock data for skills progress
const skillProgressData = [
  { month: 'Jan', trustBuilding: 65, objections: 40, crossSelling: 55, valueExplanation: 70, closing: 50 },
  { month: 'Feb', trustBuilding: 68, objections: 42, crossSelling: 58, valueExplanation: 72, closing: 53 },
  { month: 'Mar', trustBuilding: 70, objections: 45, crossSelling: 60, valueExplanation: 75, closing: 55 },
  { month: 'Apr', trustBuilding: 75, objections: 50, crossSelling: 62, valueExplanation: 78, closing: 60 },
  { month: 'May', trustBuilding: 80, objections: 55, crossSelling: 65, valueExplanation: 80, closing: 65 },
  { month: 'Jun', trustBuilding: 85, objections: 60, crossSelling: 70, valueExplanation: 83, closing: 70 }
];

// Mock strengths and weaknesses data
const strengthsData = [
  { skillKey: 'trustBuilding', score: 85, trend: 'up' as const },
  { skillKey: 'valueExplanation', score: 82, trend: 'stable' as const }
];

const weaknessesData = [
  { skillKey: 'objections', score: 62, trend: 'down' as const },
  { skillKey: 'closing', score: 70, trend: 'stable' as const }
];

// AI recommendations mock data
const aiRecommendationsMock = [
  {
    id: 'rec1',
    title: 'Improve Question Technique',
    description: 'Ask more open-ended questions to better understand customer needs.',
    skillArea: 'trustBuilding',
    priority: 'high'
  },
  {
    id: 'rec2',
    title: 'Cross-Selling Opportunities',
    description: 'Focus on related products when customers show interest in a specific category.',
    skillArea: 'crossSelling',
    priority: 'medium'
  },
  {
    id: 'rec3',
    title: 'Price Objection Handling',
    description: 'Use value-based arguments when customers express concerns about pricing.',
    skillArea: 'objections',
    priority: 'high'
  }
];

const SalesInsights = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState('30days');
  const [insightType, setInsightType] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('summary');
  const [timelineFilter, setTimelineFilter] = useState('30days'); // Filter for timeline
  
  // Initialize state based on URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    const type = searchParams.get('insightType');
    
    if (tab && ['summary', 'insights', 'recommendations'].includes(tab)) {
      setActiveTab(tab);
    }
    
    if (type) {
      setInsightType(type);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };
  
  // Filter insights based on selected filters
  const filteredInsights = expandableInsightsMock.filter(insight => {
    if (insightType !== 'all' && insight.type !== insightType) return false;
    if (skillFilter !== 'all' && insight.skillKey !== skillFilter) return false;
    return true;
  });
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t('sales.insights')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('sales.insightsDescription')}
            </p>
          </div>
          
          {/* Filter Section */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[130px]">
                <Calendar className="w-4 h-4 mr-2" />
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
                <BadgeCheckIcon className="w-4 h-4 mr-2" />
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
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="summary">{t('insights.tabs.summary')}</TabsTrigger>
            <TabsTrigger value="insights">{t('insights.tabs.insights')}</TabsTrigger>
            <TabsTrigger value="recommendations">{t('insights.tabs.recommendations')}</TabsTrigger>
          </TabsList>
          
          {/* Summary Tab */}
          <TabsContent value="summary">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard 
                title={t('insights.summary.totalInsights')} 
                value={expandableInsightsMock.length} 
                icon={<LightbulbIcon />} 
                trend={{ value: 15, isPositive: true }}
                tooltipKey="total"
                route="/sales/insights/total"
              />
              <StatCard 
                title={t('insights.summary.averageScore')} 
                value="72%" 
                icon={<BarChart3 />} 
                trend={{ value: 5, isPositive: true }}
                tooltipKey="score"
                route="/sales/insights/score"
              />
              <StatCard 
                title={t('insights.summary.improvementRate')} 
                value="8%" 
                icon={<TrendingUpIcon />} 
                trend={{ value: 3, isPositive: true }}
                tooltipKey="improvement"
                route="/sales/insights/improvement"
              />
            </div>
            
            {/* Strengths & Weaknesses Card */}
            <div className="mb-6">
              <StrengthsWeaknessesCard 
                strengths={strengthsData}
                weaknesses={weaknessesData}
              />
            </div>
            
            {/* Charts - Updated with new InsightTypeChart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Insight Types Chart - Now using the new component */}
              <InsightTypeChart data={insightTypeData} />
              
              {/* Skills Progress Chart */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('insights.charts.skillProgress')}</CardTitle>
                  
                  {/* Timeline Filter Dropdown */}
                  <Select value={timelineFilter} onValueChange={setTimelineFilter}>
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue placeholder={t('insights.filters.dateRange')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">{t('insights.filters.last7Days')}</SelectItem>
                      <SelectItem value="30days">{t('insights.filters.last30Days')}</SelectItem>
                      <SelectItem value="90days">{t('insights.filters.last90Days')}</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={skillProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend formatter={(value) => t(`insights.${value}`)} />
                        <Line type="monotone" dataKey="trustBuilding" stroke="#8884d8" />
                        <Line type="monotone" dataKey="objections" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="crossSelling" stroke="#ffc658" />
                        <Line type="monotone" dataKey="valueExplanation" stroke="#ff7300" />
                        <Line type="monotone" dataKey="closing" stroke="#0088fe" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{t('insights.insightsList')}</h3>
              <p className="text-muted-foreground mb-4">{t('insights.insightsDescription')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredInsights.length > 0 ? (
                filteredInsights.map(insight => (
                  <InsightCard 
                    key={insight.id} 
                    insight={insight} 
                    conversationId={insight.id} // For demo, using insight ID as conversation ID
                    timestamp="Apr 15, 2025"
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center border rounded-lg">
                  <p className="text-muted-foreground">{t('insights.noInsightsFound')}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            {/* Weekly Focus Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{t('insights.recommendationsList')}</h3>
                  <p className="text-muted-foreground mb-4">{t('insights.recommendationsDescription')}</p>
                </div>
                
                <div className="space-y-4">
                  {aiRecommendationsMock.map(recommendation => (
                    <Card key={recommendation.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <LightbulbIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{recommendation.title}</h4>
                            <p className="text-muted-foreground mt-1">{recommendation.description}</p>
                            <div className="mt-3 flex gap-2">
                              <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">
                                {t(`insights.${recommendation.skillArea}`)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                recommendation.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {t(`insights.priority.${recommendation.priority}`)}
                              </span>
                            </div>
                            
                            <div className="mt-4">
                              <Button size="sm" variant="outline">
                                {t('insights.viewTrainingModule')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <WeeklyFocusCard 
                  skillKey="objections"
                  context={t('insights.types.improvement.example')}
                  score={62}
                  recommendation="Попробуйте подчеркивать соотношение цены и качества вместо фокусировки только на стоимости."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default SalesInsights;
