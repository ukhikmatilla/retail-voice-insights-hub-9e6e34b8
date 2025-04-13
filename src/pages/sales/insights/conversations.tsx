
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockConversations } from '@/data/mockData';

const chartData = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 5 },
  { name: 'Thu', value: 2 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 1 },
];

const ConversationsInsightPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">
            {t('insights.pages.conversations.title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('insights.pages.conversations.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Trend Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('insights.pages.conversations.weeklyTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9333EA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.conversations.patterns')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Timing pattern</h3>
                <p className="text-sm text-muted-foreground">Most conversations happen between 2-4 PM, when customers are most active.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Duration insights</h3>
                <p className="text-sm text-muted-foreground">Successful conversations tend to last 5-7 minutes longer than unsuccessful ones.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Question frequency</h3>
                <p className="text-sm text-muted-foreground">You ask an average of 4.2 questions per conversation. Top performers ask 7+.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insights.pages.conversations.recommendations')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Ask more open questions</h3>
                <p className="text-sm text-muted-foreground">Try to increase your question count to 6+ per conversation, focusing on customer needs.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Improve conversation structure</h3>
                <p className="text-sm text-muted-foreground">Follow the needs assessment → presentation → objection handling → closing structure.</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Schedule for peak hours</h3>
                <p className="text-sm text-muted-foreground">Try to schedule more conversations during the 2-4 PM window when success rates are higher.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Conversations */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t('sales.recentConversations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConversations.slice(0, 3).map((conversation) => (
                  <div key={conversation.id} className="p-4 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Conversation #{conversation.id}</span>
                      <span className="text-sm text-muted-foreground">{conversation.date}</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span>Score: {conversation.score}%</span>
                      <span>Duration: {Math.floor(conversation.duration / 60)}:{conversation.duration % 60 < 10 ? `0${conversation.duration % 60}` : conversation.duration % 60}</span>
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

export default ConversationsInsightPage;
