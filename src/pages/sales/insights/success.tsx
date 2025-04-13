
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockConversations } from '@/data/mockData';

const chartData = [
  { name: 'Week 1', value: 58 },
  { name: 'Week 2', value: 62 },
  { name: 'Week 3', value: 59 },
  { name: 'Week 4', value: 63 },
  { name: 'Week 5', value: 67 },
  { name: 'Week 6', value: 65 },
];

const SuccessRatePage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">
            {t('insights.pages.success.title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('insights.pages.success.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Success Rate Trend Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.pages.success.weeklyTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[50, 80]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9333EA" 
                      fill="#9333EA20" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.success.patterns')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Closing techniques</h3>
                <p className="text-sm text-muted-foreground">Your success rate increases by 15% when you use assumptive close techniques.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Needs assessment</h3>
                <p className="text-sm text-muted-foreground">Conversations where you ask 5+ questions have a 24% higher success rate.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Value demonstration</h3>
                <p className="text-sm text-muted-foreground">Success rate is 18% higher when you connect features to specific customer needs.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.success.recommendations')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Use assumptive closes</h3>
                <p className="text-sm text-muted-foreground">Practice "When would you like delivery?" instead of "Do you want to buy?"</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Deepen needs assessment</h3>
                <p className="text-sm text-muted-foreground">Aim for 5+ targeted questions about customer needs before presenting solutions.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Address objections proactively</h3>
                <p className="text-sm text-muted-foreground">Identify and address common concerns before customers raise them.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Success Factors */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Success Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Time of day</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Morning (9am-12pm)</span>
                    <span className="font-medium">72% success</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Customer type</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Returning customers</span>
                    <span className="font-medium">83% success</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Product category</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Electronics</span>
                    <span className="font-medium">76% success</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Conversation length</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">10+ minutes</span>
                    <span className="font-medium">69% success</span>
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

export default SuccessRatePage;
