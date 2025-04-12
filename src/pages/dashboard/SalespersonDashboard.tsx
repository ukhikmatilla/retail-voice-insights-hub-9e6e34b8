
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import ConversationCard from '@/components/ConversationCard';
import InsightCard from '@/components/InsightCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockSalespersonStats, mockConversations, mockTrainings } from '@/data/mockData';
import { MessageSquareIcon, TrendingUpIcon, AlertTriangleIcon, PercentIcon } from 'lucide-react';

const SalespersonDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">
        {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
      </h1>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
          <TabsTrigger value="conversations">{t('dashboard.conversations')}</TabsTrigger>
          <TabsTrigger value="insights">{t('dashboard.insights')}</TabsTrigger>
          <TabsTrigger value="training">{t('dashboard.training')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title={t('dashboard.stats.totalConversations')}
              value={mockSalespersonStats.totalConversations}
              icon={<MessageSquareIcon className="h-4 w-4" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.averageScore')}
              value={`${mockSalespersonStats.averageScore}%`}
              icon={<PercentIcon className="h-4 w-4" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.successRate')}
              value={`${mockSalespersonStats.successRate}%`}
              icon={<TrendingUpIcon className="h-4 w-4" />}
              trend={{ value: 3, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.missedOpportunities')}
              value={mockSalespersonStats.missedOpportunities}
              icon={<AlertTriangleIcon className="h-4 w-4" />}
              trend={{ value: 2, isPositive: false }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.conversations')}</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                {mockConversations.slice(0, 2).map((conversation) => (
                  <ConversationCard key={conversation.id} conversation={conversation} />
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.training')}</CardTitle>
              </CardHeader>
              <CardContent>
                {mockTrainings.map((training) => (
                  <div 
                    key={training.id} 
                    className="mb-4 p-4 border rounded-lg last:mb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{training.title}</h3>
                      <Badge 
                        variant={
                          training.status === 'completed' 
                            ? 'secondary' 
                            : training.status === 'inProgress' 
                              ? 'outline'
                              : 'default'
                        }
                      >
                        {training.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{training.description}</p>
                    {training.status === 'inProgress' && (
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-1.5" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockConversations.map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockConversations.flatMap((conversation) => 
              conversation.insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))
            )}
          </div>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            {mockTrainings.map((training) => (
              <Card key={training.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg">{training.title}</h3>
                    <Badge 
                      variant={
                        training.status === 'completed' 
                          ? 'secondary' 
                          : training.status === 'inProgress' 
                            ? 'outline'
                            : 'default'
                      }
                    >
                      {training.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{training.description}</p>
                  {training.status === 'inProgress' && (
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Progress</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                  {training.dueDate && (
                    <p className="text-sm mt-4">
                      Due: {new Date(training.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalespersonDashboard;
