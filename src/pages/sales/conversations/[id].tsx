import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Play, Pause, Smartphone, Globe, Calendar, Clock } from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InsightCard from '@/components/InsightCard';
import TranscriptViewer, { TranscriptMessage } from '@/components/conversations/TranscriptViewer';
import SkillFeedbackAccordion from '@/components/ai/SkillFeedbackAccordion';
import { mockConversations } from '@/data/mockData';
import { conversationSkillAnalysisMock } from '@/mocks/conversationSkillAnalysis';
import { InsightType } from '@/types';
import { nanoid } from 'nanoid';
import InsightSection from '@/components/insights/InsightSection';
import { expandableInsightsMock } from '@/data/insightsMockData';

// Mock transcript data - in a real application, this would be dynamic
// Ensuring that the speaker property is explicitly typed as "salesperson" | "customer"
const mockTranscript: TranscriptMessage[] = [{
  id: nanoid(),
  speaker: "salesperson",
  content: 'Hello! Welcome to our store. How can I help you today?',
  timestamp: '00:00'
}, {
  id: nanoid(),
  speaker: "customer",
  content: 'Hi, I\'m looking for kids shoes, size 30.',
  timestamp: '00:05'
}, {
  id: nanoid(),
  speaker: "salesperson",
  content: 'Of course! We have several options for kids in size 30. Let me show you our collection over here.',
  timestamp: '00:12'
}, {
  id: nanoid(),
  speaker: "customer",
  content: 'Do they come in blue? My son really likes blue shoes.',
  timestamp: '00:22'
}, {
  id: nanoid(),
  speaker: "salesperson",
  content: 'Yes, we have these models in blue. They\'re very comfortable and durable for active children.',
  timestamp: '00:28'
}, {
  id: nanoid(),
  speaker: "customer",
  content: 'Perfect! I\'ll take these. How much are they?',
  timestamp: '00:40'
}, {
  id: nanoid(),
  speaker: "salesperson",
  content: 'These are 150,000 soums. Would you like me to get them in a box for you?',
  timestamp: '00:45'
}, {
  id: nanoid(),
  speaker: "customer",
  content: 'Yes, please. I\'ll take them.',
  timestamp: '00:52'
}];
const ConversationDetail = () => {
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('transcript');

  // Find the conversation by ID
  const conversation = mockConversations.find(conv => conv.id === id);

  // Simulate audio progress updates
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Return to conversations list if conversation not found
  if (!conversation) {
    return <RoleProtectedRoute allowedRoles={['salesperson']}>
        <RoleLayout currentPath={location.pathname}>
          <div className="animate-fade-in">
            <Button variant="ghost" onClick={() => navigate('/sales/conversations')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
            <div className="p-12 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-2">{t('common.error')}</h2>
              <p className="text-muted-foreground">{t('sales.noConversations')}</p>
            </div>
          </div>
        </RoleLayout>
      </RoleProtectedRoute>;
  }
  const formattedDate = format(new Date(conversation.date), 'PPP');

  // Additional example insights for the extended types
  const additionalInsights = [{
    id: "behavior-1",
    type: "behavior" as InsightType,
    content: t("insights.types.behavior.example"),
    skillKey: "trustBuilding"
  }, {
    id: "custom-1",
    type: "custom" as InsightType,
    content: "Customer showed interest in product colors, indicating preference-based shopping.",
    timestamp: "00:25"
  }];

  // All insights including standard ones from the conversation plus the new types
  const allInsights = [...conversation.insights, ...additionalInsights];

  // Group insights by type for better organization
  const groupedInsights = {
    urgent: allInsights.filter(i => i.type === "urgent"),
    improvement: allInsights.filter(i => i.type === "improvement"),
    opportunity: allInsights.filter(i => i.type === "opportunity"),
    behavior: allInsights.filter(i => i.type === "behavior"),
    custom: allInsights.filter(i => i.type === "custom")
  };
  return <RoleProtectedRoute allowedRoles={['salesperson']}>
      <RoleLayout currentPath={location.pathname}>
        <div className="animate-fade-in">
          {/* Back button */}
          <Button variant="ghost" className="mb-6" onClick={() => navigate('/sales/conversations')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">
                  {t('conversation.title', {
                  date: formattedDate
                })}
                </h1>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge variant={conversation.score >= 90 ? "default" : conversation.score >= 70 ? "secondary" : "destructive"}>
                    {t('conversation.score')}: {conversation.score}/100
                  </Badge>
                  <Badge variant="outline">
                    {Math.floor(conversation.duration / 60)}:{(conversation.duration % 60).toString().padStart(2, '0')}
                  </Badge>
                </div>
              </div>
              
              {/* Audio player */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-md font-medium">
                    {t('conversation.playAudio')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" className="w-12 h-12 rounded-full">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                    </Button>
                    <div className="space-y-2">
                      <Progress value={audioProgress} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {Math.floor(audioProgress / 100 * conversation.duration) / 60 < 1 ? '00:' : '01:'}
                          {Math.floor(audioProgress / 100 * (conversation.duration % 60)).toString().padStart(2, '0')}
                        </span>
                        <span>
                          {Math.floor(conversation.duration / 60)}:
                          {(conversation.duration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Transcript and Insights */}
              <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="transcript">{t('conversation.transcript')}</TabsTrigger>
                  <TabsTrigger value="insights">{t('conversation.insights')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transcript" className="space-y-4 animate-fade-in">
                  <Card>
                    <CardContent className="pt-6">
                      <TranscriptViewer messages={mockTranscript} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insights" className="space-y-4 animate-fade-in">
                  <Card>
                    <CardContent className="pt-6">
                      <SkillFeedbackAccordion skills={conversationSkillAnalysisMock} />
                    </CardContent>
                  </Card>
                  
                  {/* New Expandable Insights Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('conversation.insights')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InsightSection insights={expandableInsightsMock} />
                    </CardContent>
                  </Card>
                  
                  {/* Old Insights Display - kept for backward compatibility */}
                  {/* Critical/Urgent insights - shown first for priority */}
                  {groupedInsights.urgent.length > 0 && <div className="mb-4">
                      <h3 className="text-md font-semibold mb-2 text-insight-red">
                        {t('insight.type.urgent')} ({groupedInsights.urgent.length})
                      </h3>
                      <div className="space-y-3">
                        {groupedInsights.urgent.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                      </div>
                    </div>}
                  
                  {/* Improvement insights */}
                  {groupedInsights.improvement.length > 0 && <div className="mb-4">
                      
                      <div className="space-y-3">
                        {groupedInsights.improvement.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                      </div>
                    </div>}
                  
                  {/* Opportunity insights */}
                  {groupedInsights.opportunity.length > 0 && <div className="mb-4">
                      
                      <div className="space-y-3">
                        {groupedInsights.opportunity.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                      </div>
                    </div>}
                  
                  {/* Behavior insights */}
                  {groupedInsights.behavior.length > 0 && <div className="mb-4">
                      
                      <div className="space-y-3">
                        {groupedInsights.behavior.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                      </div>
                    </div>}
                  
                  {/* Custom insights */}
                  {groupedInsights.custom.length > 0 && <div className="mb-4">
                      
                      <div className="space-y-3">
                        {groupedInsights.custom.map(insight => <InsightCard key={insight.id} insight={insight} />)}
                      </div>
                    </div>}
                  
                  {/* Empty state when no insights are available */}
                  {Object.values(groupedInsights).every(group => group.length === 0) && <Card className="p-8 text-center text-muted-foreground">
                      {t('sales.noAnalysisAvailable')}
                    </Card>}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - meta info */}
            <div className="space-y-6">
              {/* Meta information card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('conversation.metaInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('conversation.date')}</p>
                        <p className="text-sm font-medium">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-left text-xs px-0 mx-0">{t('conversation.duration')}</p>
                        <p className="text-sm font-medium">
                          {Math.floor(conversation.duration / 60)}:{(conversation.duration % 60).toString().padStart(2, '0')} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('conversation.device')}</p>
                        <p className="text-sm font-medium">iPhone 14</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('conversation.language')}</p>
                        <p className="text-sm font-medium">Uzbek 🇺🇿</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Score breakdown */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">{t('conversation.score')} breakdown</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Engagement</span>
                          <span>85/100</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Product Knowledge</span>
                          <span>92/100</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Closing Skills</span>
                          <span>78/100</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Customer Satisfaction</span>
                          <span>90/100</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('conversation.recommendations.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                    <p className="font-medium mb-1">{t('conversation.recommendations.improvement')}</p>
                    <p>Ask more open-ended questions to understand customer needs better.</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                    <p className="font-medium mb-1">{t('conversation.recommendations.opportunity')}</p>
                    <p>Mention our loyalty program for repeat customers.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </RoleLayout>
    </RoleProtectedRoute>;
};
export default ConversationDetail;