
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockHrStats, mockTeamMembers } from '@/data/mockData';
import { 
  UsersIcon, 
  BriefcaseIcon, 
  PercentIcon, 
  GraduationCapIcon 
} from 'lucide-react';

const HrDashboard = () => {
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
          <TabsTrigger value="personnel">{t('dashboard.personnel')}</TabsTrigger>
          <TabsTrigger value="behavior-analysis">{t('dashboard.behaviorAnalysis')}</TabsTrigger>
          <TabsTrigger value="training-management">{t('dashboard.trainingManagement')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title="Active Personnel"
              value={mockTeamMembers.length}
              icon={<UsersIcon className="h-4 w-4" />}
              trend={{ value: 2, isPositive: true }}
            />
            <StatCard 
              title="Retention Rate"
              value="92%"
              icon={<PercentIcon className="h-4 w-4" />}
              trend={{ value: 3, isPositive: true }}
            />
            <StatCard 
              title="Training Completion"
              value="76%"
              icon={<GraduationCapIcon className="h-4 w-4" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title="Open Positions"
              value="3"
              icon={<BriefcaseIcon className="h-4 w-4" />}
              trend={{ value: 1, isPositive: false }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Performance by Hire Source
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Personality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Personality Types Among Staff
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personnel Tab */}
        <TabsContent value="personnel" className="animate-fade-in">
          <div className="flex justify-end mb-6">
            <Button>Add New Personnel</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        {/* Behavior Analysis Tab */}
        <TabsContent value="behavior-analysis" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Communication Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockTeamMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">{member.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Speech Tempo</span>
                          <span>Medium-Fast</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: '70%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confidence</span>
                          <span>High</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: '85%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Customer Focus</span>
                          <span>Medium</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: '60%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Management Tab */}
        <TabsContent value="training-management" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Advanced Sales Techniques</h3>
                    <p className="text-sm text-muted-foreground mb-3">A comprehensive program for developing advanced sales skills and strategies.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">4 modules</span>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Customer Psychology</h3>
                    <p className="text-sm text-muted-foreground mb-3">Understanding customer motivations and decision-making processes.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3 modules</span>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Effective Communication</h3>
                    <p className="text-sm text-muted-foreground mb-3">Techniques for clear and persuasive communication in sales environments.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">5 modules</span>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Training Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for Chart */}
                  Chart: Training Program Completion Rates
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HrDashboard;
