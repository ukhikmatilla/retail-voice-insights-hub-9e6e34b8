
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  LineChart as LineChartIcon, 
  TrendingUpIcon, 
  LightbulbIcon 
} from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Mock data for score trend
const scoreTrendData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 68 },
  { week: 'Week 3', score: 72 },
  { week: 'Week 4', score: 75 },
  { week: 'Week 5', score: 80 },
  { week: 'Week 6', score: 82 },
];

// Mock data for skill contribution
const skillContributionData = [
  { skill: 'trustBuilding', score: 85 },
  { skill: 'valueExplanation', score: 80 },
  { skill: 'crossSelling', score: 75 },
  { skill: 'closing', score: 70 },
  { skill: 'objections', score: 65 },
];

// Mock AI tips
const aiScoreTips = [
  {
    id: 'tip1',
    title: 'Ask More Open Questions',
    description: 'Try to use more open-ended questions to understand customer needs better.',
    impact: '+5% score'
  },
  {
    id: 'tip2',
    title: 'Address Price Objections Early',
    description: 'Customers responded better when value was established before price discussion.',
    impact: '+3% score'
  },
  {
    id: 'tip3',
    title: 'Personalize Product Benefits',
    description: 'The most successful conversations connected product features to specific customer needs.',
    impact: '+7% score'
  }
];

const ScoreInsightsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30days');
  
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
            <h1 className="text-3xl font-bold">{t('insights.score.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('insights.score.description')}
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
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Score Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.score.trendChart')}</CardTitle>
              <CardDescription>
                {t('insights.score.trendDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ScoreTrendGraph data={scoreTrendData} />
              </div>
            </CardContent>
          </Card>
          
          {/* Skill Contribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.score.skillContribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <SkillContributionChart data={skillContributionData} />
              </div>
            </CardContent>
          </Card>
          
          {/* AI Score Tips */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <LightbulbIcon className="h-5 w-5 text-primary" />
              <CardTitle>{t('insights.score.aiTips')}</CardTitle>
            </CardHeader>
            <CardContent>
              <AiScoreTips tips={aiScoreTips} />
            </CardContent>
          </Card>
        </div>
        
        {/* Score Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>{t('insights.score.recommendations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreRecommendations />
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
};

// Score Trend Graph Component
const ScoreTrendGraph = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="score" 
          stroke="#3b82f6" 
          name={t('insights.score.averageScore')}
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Skill Contribution Chart Component
const SkillContributionChart = ({ data }) => {
  const { t } = useTranslation();
  
  // Translate skill names
  const translatedData = data.map(item => ({
    ...item,
    skillName: t(`insights.${item.skill}`)
  }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={translatedData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis 
          dataKey="skillName" 
          type="category" 
          width={100}
        />
        <Tooltip />
        <Bar 
          dataKey="score" 
          fill="#3b82f6" 
          name={t('insights.score.skillScore')} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// AI Score Tips Component
const AiScoreTips = ({ tips }) => {
  return (
    <div className="space-y-4">
      {tips.map(tip => (
        <div key={tip.id} className="p-3 bg-accent/10 rounded-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">{tip.title}</h4>
            <span className="text-sm text-emerald-600 font-semibold">{tip.impact}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
        </div>
      ))}
    </div>
  );
};

// Score Recommendations Component
const ScoreRecommendations = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-accent/10 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUpIcon className="h-5 w-5 text-emerald-600" />
          <h4 className="font-medium">{t('insights.score.shortTermTips')}</h4>
        </div>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>{t('insights.score.tip1')}</li>
          <li>{t('insights.score.tip2')}</li>
          <li>{t('insights.score.tip3')}</li>
        </ul>
      </div>
      <div className="p-4 bg-accent/10 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <LineChartIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">{t('insights.score.longTermTips')}</h4>
        </div>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>{t('insights.score.tip4')}</li>
          <li>{t('insights.score.tip5')}</li>
          <li>{t('insights.score.tip6')}</li>
        </ul>
      </div>
    </div>
  );
};

export default ScoreInsightsPage;
