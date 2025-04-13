
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays } from 'date-fns';
import { 
  BookOpen, 
  Filter, 
  Award, 
  TrendingUp, 
  MessageCircle,
  Check,
  Clock,
  Lightbulb
} from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import TrainingModuleCard from '@/components/TrainingModuleCard';

// Mock training modules
const trainingModules = [
  {
    id: '1',
    title: 'Handling Price Objections',
    description: 'Learn effective strategies to address price concerns from customers.',
    skill: 'objections',
    level: 'intermediate',
    status: 'recommended',
    progress: 0,
    dueDate: '2025-05-01'
  },
  {
    id: '2',
    title: 'Building Initial Trust',
    description: 'Master the art of establishing trust in the first minutes of customer interaction.',
    skill: 'trustBuilding',
    level: 'beginner',
    status: 'inProgress',
    progress: 35,
    dueDate: '2025-04-25'
  },
  {
    id: '3',
    title: 'Effective Cross-selling',
    description: 'Discover techniques to increase basket size through relevant recommendations.',
    skill: 'crossSelling',
    level: 'advanced',
    status: 'inProgress',
    progress: 75,
    dueDate: '2025-04-20'
  },
  {
    id: '4',
    title: 'Advanced Closing Techniques',
    description: 'Learn psychology-based approaches to closing sales with higher success rates.',
    skill: 'closing',
    level: 'advanced',
    status: 'completed',
    progress: 100,
    completedDate: '2025-04-01'
  },
  {
    id: '5',
    title: 'Value Communication',
    description: 'Learn how to effectively communicate product value rather than features.',
    skill: 'valueExplanation',
    level: 'intermediate',
    status: 'completed',
    progress: 100,
    completedDate: '2025-03-15'
  },
  {
    id: '6',
    title: 'Understanding Customer Signals',
    description: 'Recognize verbal and non-verbal cues to better address customer needs.',
    skill: 'trustBuilding',
    level: 'intermediate',
    status: 'assigned',
    progress: 0,
    dueDate: '2025-05-10'
  }
];

// Mock progress data for chart
const generateProgressData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i -= 7) {
    const date = subDays(today, i);
    data.push({
      week: format(date, 'MMM d'),
      completed: Math.floor(Math.random() * 3 + (days - i) / 7), // Increasing trend
      inProgress: Math.floor(Math.random() * 2)
    });
  }
  
  return data;
};

const progressData = generateProgressData();

// Mock achievements data
const achievements = [
  {
    id: '1',
    title: 'First Module',
    description: 'Completed your first training module',
    icon: <Award className="h-6 w-6 text-amber-500" />,
    earned: true
  },
  {
    id: '2',
    title: 'Skill Master',
    description: 'Achieved +15% in trust building',
    icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
    earned: true
  },
  {
    id: '3',
    title: 'Consistent Learner',
    description: 'Completed training 5 days in a row',
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    earned: true
  },
  {
    id: '4',
    title: 'Knowledge Sharing',
    description: 'Shared insights with 3 team members',
    icon: <MessageCircle className="h-6 w-6 text-violet-500" />,
    earned: false
  }
];

// Component for AI recommendation header
const TrainingHeader = ({ recommendedModule }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-indigo-900">{t('training.aiGoalTitle')}</h3>
            <p className="text-sm text-indigo-700 mt-1">
              {t('training.aiGoalDesc')} <span className="font-medium">{t(`insights.${recommendedModule.skill}`)}</span>
            </p>
          </div>
          <div>
            <Button>
              {t('training.start')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for filters
const TrainingFilterPanel = ({ filters, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 p-4 bg-muted rounded-lg">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 mr-2 opacity-70" />
        <span className="font-medium text-sm">{t('common.search')}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <Select value={filters.skill} onValueChange={(value) => onChange('skill', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.skillFilter')} />
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
        
        <div>
          <Select value={filters.level} onValueChange={(value) => onChange('level', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.levelFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={filters.status} onValueChange={(value) => onChange('status', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.statusFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="recommended">{t('training.recommended')}</SelectItem>
              <SelectItem value="inProgress">{t('training.inProgress')}</SelectItem>
              <SelectItem value="completed">{t('training.completed')}</SelectItem>
              <SelectItem value="assigned">{t('training.status.assigned')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

// Component for progress chart
const TrainingProgressChart = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('training.progressTitle', 'Your Learning Progress')}</CardTitle>
        <CardDescription>{t('training.progressDesc', 'Track your completed and in-progress modules')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#8884d8" 
                name={t('training.completed')} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                stroke="#82ca9d" 
                name={t('training.inProgress')} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for achievements badges
const TrainingBadgeList = ({ badges }) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('training.badges.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div 
              key={badge.id} 
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                badge.earned ? 'bg-white' : 'bg-gray-50 opacity-50'
              }`}
            >
              <div className="mb-2">
                {badge.icon}
              </div>
              <h4 className="text-sm font-medium text-center">{badge.title}</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
              {badge.earned && (
                <Badge variant="secondary" className="mt-2">
                  <Check className="h-3 w-3 mr-1" /> {t('training.earned', 'Earned')}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SalesTraining = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [filters, setFilters] = useState({
    skill: 'all',
    level: 'all',
    status: 'all',
  });
  
  // Find recommended module for AI goal
  const recommendedModule = trainingModules.find(module => module.status === 'recommended') || trainingModules[0];
  
  // Filter modules based on selected filters
  const filteredModules = trainingModules.filter(module => {
    if (filters.skill !== 'all' && module.skill !== filters.skill) return false;
    if (filters.level !== 'all' && module.level !== filters.level) return false;
    if (filters.status !== 'all' && module.status !== filters.status) return false;
    return true;
  });
  
  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">{t('sales.training')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('sales.trainingDescription', 'Personalized training modules to improve your sales skills based on AI analysis.')}
        </p>
        
        {/* AI Goal of the Week */}
        <div className="mb-8">
          <TrainingHeader recommendedModule={recommendedModule} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Left side on desktop, top on mobile */}
          <div className="lg:col-span-1">
            <TrainingFilterPanel 
              filters={filters} 
              onChange={handleFilterChange} 
            />
          </div>
          
          {/* Training Modules */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">{t('sales.trainingModules')}</h2>
            {filteredModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredModules.map(module => (
                  <TrainingModuleCard 
                    key={module.id} 
                    training={module}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center mb-8">
                <p className="text-muted-foreground">{t('sales.noTrainingModules')}</p>
              </Card>
            )}
            
            {/* Progress Chart */}
            <div className="mb-8">
              <TrainingProgressChart data={progressData} />
            </div>
            
            {/* Achievements */}
            <div>
              <TrainingBadgeList badges={achievements} />
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default SalesTraining;
