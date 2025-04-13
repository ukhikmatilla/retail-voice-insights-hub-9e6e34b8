
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { mockConversations } from '@/data/mockData';

const chartData = [
  { name: 'Upselling', value: 5, color: '#9333EA' },
  { name: 'Additional Features', value: 3, color: '#3B82F6' },
  { name: 'Value Explanation', value: 2, color: '#10B981' },
  { name: 'Service Plans', value: 2, color: '#F59E0B' },
];

const MissedOpportunitiesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">
            {t('insights.pages.missed.title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('insights.pages.missed.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Opportunity Types Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.pages.missed.patterns')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.missed.patterns')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Upselling opportunities</h3>
                <p className="text-sm text-muted-foreground">In 5 conversations, you didn't offer premium product options that matched customer needs.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Feature explanation</h3>
                <p className="text-sm text-muted-foreground">3 customers showed interest in specific features, but full capabilities weren't explained.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Service plans</h3>
                <p className="text-sm text-muted-foreground">2 customers bought products without being offered relevant service/warranty plans.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.missed.recommendations')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Create an upsell checklist</h3>
                <p className="text-sm text-muted-foreground">Use a structured approach to remind yourself of upsell opportunities for each product.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Listen for buying signals</h3>
                <p className="text-sm text-muted-foreground">Practice identifying when customers express interest in additional features or services.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Complete cross-selling training</h3>
                <p className="text-sm text-muted-foreground">Enroll in the "Effective Cross-Selling" training module to improve your skills.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Missed Opportunities */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Missed Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConversations.slice(0, 3).map((conversation) => (
                  <div key={conversation.id} className="p-4 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Conversation #{conversation.id}</span>
                      <span className="text-sm text-muted-foreground">{conversation.date}</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Missed opportunity
                      </Badge>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Customer showed interest in premium features but was not offered the upgraded model.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleLayout>
  );
};

export default MissedOpportunitiesPage;
