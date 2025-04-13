
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockConversations } from '@/data/mockData';

const chartData = [
  { name: 'Week 1', value: 72 },
  { name: 'Week 2', value: 76 },
  { name: 'Week 3', value: 78 },
  { name: 'Week 4', value: 75 },
  { name: 'Week 5', value: 81 },
  { name: 'Week 6', value: 84 },
];

const ScoreInsightPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">
            {t('insights.pages.score.title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('insights.pages.score.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Trend Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.pages.score.weeklyTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9333EA" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.score.patterns')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Consistent improvement</h3>
                <p className="text-sm text-muted-foreground">Your score has increased by an average of 2% per week over the last 6 weeks.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Skill contributions</h3>
                <p className="text-sm text-muted-foreground">Your largest gains came from improved objection handling (+12%) and value explanation (+8%).</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Performance dips</h3>
                <p className="text-sm text-muted-foreground">Your score decreases after extended periods without training refreshers.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.score.recommendations')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Focus on closing techniques</h3>
                <p className="text-sm text-muted-foreground">This is your lowest-scoring area. Complete the "Effective Closing" training module.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Regular training refreshers</h3>
                <p className="text-sm text-muted-foreground">Schedule 15-minute training sessions twice weekly to maintain skill levels.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Practice active listening</h3>
                <p className="text-sm text-muted-foreground">Try to summarize customer needs before presenting solutions.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Score Breakdown */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('conversation.scoreBreakdown')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Needs Assessment</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">How well you identify customer needs</span>
                    <span className="font-medium">86%</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Product Knowledge</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Your product feature awareness</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Objection Handling</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">How you address customer concerns</span>
                    <span className="font-medium">78%</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Closing Techniques</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Your ability to finalize sales</span>
                    <span className="font-medium">72%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleLayout>
  );
};

export default ScoreInsightPage;
