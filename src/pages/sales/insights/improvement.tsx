
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUpIcon,
  LightbulbIcon,
  CheckCircle2Icon
} from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar
} from 'recharts';

// Mock data for skill improvement
const skillImprovementData = [
  { month: 'Jan', trustBuilding: 65, objections: 40, crossSelling: 55, valueExplanation: 70, closing: 50 },
  { month: 'Feb', trustBuilding: 68, objections: 42, crossSelling: 58, valueExplanation: 72, closing: 53 },
  { month: 'Mar', trustBuilding: 70, objections: 45, crossSelling: 60, valueExplanation: 75, closing: 55 },
  { month: 'Apr', trustBuilding: 75, objections: 50, crossSelling: 62, valueExplanation: 78, closing: 60 },
  { month: 'May', trustBuilding: 80, objections: 55, crossSelling: 65, valueExplanation: 80, closing: 65 },
  { month: 'Jun', trustBuilding: 85, objections: 60, crossSelling: 70, valueExplanation: 83, closing: 70 }
];

// Mock data for before/after delta
const beforeAfterData = [
  { skill: 'trustBuilding', before: 65, after: 85, delta: 20 },
  { skill: 'objections', before: 40, after: 60, delta: 20 },
  { skill: 'crossSelling', before: 55, after: 70, delta: 15 },
  { skill: 'valueExplanation', before: 70, after: 83, delta: 13 },
  { skill: 'closing', before: 50, after: 70, delta: 20 }
];

// Mock improvement log data
const improvementLogData = [
  { 
    id: 'log1', 
    date: '2025-04-10', 
    skill: 'trustBuilding', 
    improvement: 5, 
    trigger: 'Started asking more follow-up questions about customer needs'
  },
  { 
    id: 'log2', 
    date: '2025-03-28', 
    skill: 'objections', 
    improvement: 8, 
    trigger: 'Used value-based arguments when addressing price concerns'
  },
  { 
    id: 'log3', 
    date: '2025-03-15', 
    skill: 'crossSelling', 
    improvement: 10, 
    trigger: 'Started suggesting complementary products based on purchase history'
  },
  { 
    id: 'log4', 
    date: '2025-03-02', 
    skill: 'closing', 
    improvement: 12, 
    trigger: 'Added clear next steps at the end of each conversation'
  }
];

const ImprovementInsightsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [dateRange, setDateRange] = useState('6months');
  
  return (
    <RoleLayout currentPath={location.pathname}>
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
            <h1 className="text-3xl font-bold">{t('insights.improvement.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('insights.improvement.description')}
            </p>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t('insights.filters.dateRange')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">{t('insights.filters.last3Months')}</SelectItem>
              <SelectItem value="6months">{t('insights.filters.last6Months')}</SelectItem>
              <SelectItem value="12months">{t('insights.filters.last12Months')}</SelectItem>
              <SelectItem value="custom">{t('insights.filters.custom')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Skill Improvement Line Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.improvement.skillImprovementChart')}</CardTitle>
              <CardDescription>
                {t('insights.improvement.chartDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <SkillImprovementLineChart data={skillImprovementData} />
              </div>
            </CardContent>
          </Card>
          
          {/* Before/After Skill Delta */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.improvement.beforeAfter')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BeforeAfterSkillDelta data={beforeAfterData} />
              </div>
            </CardContent>
          </Card>
          
          {/* AI Improvement Advice */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <LightbulbIcon className="h-5 w-5 text-primary" />
              <CardTitle>{t('insights.improvement.aiAdvice')}</CardTitle>
            </CardHeader>
            <CardContent>
              <AiImprovementAdvice />
            </CardContent>
          </Card>
        </div>
        
        {/* Improvement Log */}
        <Card>
          <CardHeader>
            <CardTitle>{t('insights.improvement.improvementLog')}</CardTitle>
            <CardDescription>
              {t('insights.improvement.logDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImprovementLog data={improvementLogData} />
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
};

// Skill Improvement Line Chart Component
const SkillImprovementLineChart = ({ data }) => {
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
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend formatter={(value) => t(`insights.${value}`)} />
        <Line 
          type="monotone" 
          dataKey="trustBuilding" 
          stroke="#8884d8" 
        />
        <Line 
          type="monotone" 
          dataKey="objections" 
          stroke="#82ca9d" 
        />
        <Line 
          type="monotone" 
          dataKey="crossSelling" 
          stroke="#ffc658" 
        />
        <Line 
          type="monotone" 
          dataKey="valueExplanation" 
          stroke="#ff7300" 
        />
        <Line 
          type="monotone" 
          dataKey="closing" 
          stroke="#0088fe" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Before/After Skill Delta Component
const BeforeAfterSkillDelta = ({ data }) => {
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
        <Legend />
        <Bar 
          dataKey="before" 
          fill="#94a3b8" 
          name={t('insights.improvement.before')} 
        />
        <Bar 
          dataKey="after" 
          fill="#3b82f6" 
          name={t('insights.improvement.after')} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// AI Improvement Advice Component
const AiImprovementAdvice = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-accent/10 rounded-lg">
        <h4 className="font-medium text-primary">{t('insights.improvement.keyInsight')}</h4>
        <p className="text-sm mt-2">
          {t('insights.improvement.aiAdvice1')}
        </p>
        <div className="mt-3">
          <Button size="sm" variant="outline">
            {t('insights.improvement.viewRelatedTraining')}
          </Button>
        </div>
      </div>
      <div className="p-4 bg-accent/10 rounded-lg">
        <h4 className="font-medium text-primary">{t('insights.improvement.nextChallenge')}</h4>
        <p className="text-sm mt-2">
          {t('insights.improvement.aiAdvice2')}
        </p>
      </div>
    </div>
  );
};

// Improvement Log Component
const ImprovementLog = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      {data.map(item => (
        <div key={item.id} className="flex items-start gap-3 p-3 border-b last:border-0">
          <CheckCircle2Icon className="h-5 w-5 text-emerald-600 mt-0.5" />
          <div className="flex-1">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <Badge variant="outline">{t(`insights.${item.skill}`)}</Badge>
                <span className="text-emerald-600 font-semibold ml-2">+{item.improvement}%</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm mt-1">
              {item.trigger}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImprovementInsightsPage;
