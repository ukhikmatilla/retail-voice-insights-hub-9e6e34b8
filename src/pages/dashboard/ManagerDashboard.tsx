
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockManagerStats, mockTeamMembers } from '@/data/mockData';
import { 
  UsersIcon, 
  MessageSquareIcon, 
  PercentIcon, 
  AlertTriangleIcon 
} from 'lucide-react';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const underperformers = mockTeamMembers.filter(member => member.averageScore < 75);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">
        {t('dashboard.welcome', { name: user?.name.split(' ')[0] || '' })}
      </h1>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
          <TabsTrigger value="team">{t('dashboard.team')}</TabsTrigger>
          <TabsTrigger value="insights">{t('dashboard.insights')}</TabsTrigger>
          <TabsTrigger value="coaching">{t('dashboard.training')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title={t('dashboard.stats.totalConversations')}
              value={mockManagerStats.totalConversations}
              icon={<MessageSquareIcon className="h-4 w-4" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.averageScore')}
              value={`${mockManagerStats.averageScore}%`}
              icon={<PercentIcon className="h-4 w-4" />}
              trend={{ value: 3, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.successRate')}
              value={`${mockManagerStats.successRate}%`}
              icon={<PercentIcon className="h-4 w-4" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title={t('dashboard.stats.missedOpportunities')}
              value={mockManagerStats.missedOpportunities}
              icon={<AlertTriangleIcon className="h-4 w-4" />}
              trend={{ value: 4, isPositive: false }}
            />
          </div>

          {underperformers.length > 0 && (
            <Card className="mb-8 border-insight-red/30">
              <CardHeader>
                <CardTitle className="text-insight-red">
                  {t('dashboard.criticalAttention')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {underperformers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Team Performance over Time
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Success Rate by Category
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Common Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md insight-improvement">
                  <h3 className="font-medium mb-2">Product Knowledge</h3>
                  <p className="text-sm">The team demonstrates strong product knowledge overall, with detailed explanations of features and specifications.</p>
                </div>
                <div className="p-4 border rounded-md insight-opportunity">
                  <h3 className="font-medium mb-2">Closing Techniques</h3>
                  <p className="text-sm">Most team members need improvement in closing techniques, particularly when dealing with price objections.</p>
                </div>
                <div className="p-4 border rounded-md insight-urgent">
                  <h3 className="font-medium mb-2">Upselling Skills</h3>
                  <p className="text-sm">The team is consistently missing opportunities to suggest additional products or accessories that complement initial purchases.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coaching Tab */}
        <TabsContent value="coaching" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Upselling Techniques</h3>
                    <p className="text-sm text-muted-foreground mb-4">A comprehensive program to help sales staff identify and capitalize on upselling opportunities.</p>
                    <div className="flex justify-end">
                      <Button size="sm">Assign to Team</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Handling Customer Objections</h3>
                    <p className="text-sm text-muted-foreground mb-4">Learn effective strategies for addressing common objections during the sales process.</p>
                    <div className="flex justify-end">
                      <Button size="sm">Assign to Team</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Building Customer Rapport</h3>
                    <p className="text-sm text-muted-foreground mb-4">Techniques for building trust and establishing strong relationships with customers.</p>
                    <div className="flex justify-end">
                      <Button size="sm">Assign to Team</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Training Completion by Team Member
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDashboard;
