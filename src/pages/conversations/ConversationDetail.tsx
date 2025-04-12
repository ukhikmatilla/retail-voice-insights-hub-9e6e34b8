
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { mockConversations } from '@/data/mockData';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, PercentIcon } from 'lucide-react';
import { format } from 'date-fns';
import InsightCard from '@/components/InsightCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversationSkillAnalysisMock } from '@/mocks/conversationSkillAnalysis';
import SkillFeedbackAccordion from '@/components/ai/SkillFeedbackAccordion';
import TranscriptViewer, { TranscriptMessage } from '@/components/conversations/TranscriptViewer';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const conversation = mockConversations.find(c => c.id === id);
  
  if (!conversation) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Conversation not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  // Format duration from seconds to minutes:seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Enhanced transcript with inline AI insights
  const mockTranscriptWithInsights: TranscriptMessage[] = [
    { 
      id: "1",
      speaker: 'salesperson', 
      content: 'Hello! Welcome to our store. How can I help you today?',
      timestamp: '00:00',
      insight: {
        category: 'personalization',
        title: {
          uz: "Shaxsiylashtirish",
          ru: "Персонализация"
        },
        message: {
          uz: "Salomlashish yaxshi, lekin mijozning ismini so'rab, unga shaxsiy yondashishingiz mumkin edi.",
          ru: "Приветствие хорошее, но можно было спросить имя клиента для более персонализированного подхода."
        }
      }
    },
    { 
      id: "2",
      speaker: 'customer', 
      content: "Hi, I'm looking for a new smartphone with a good camera.",
      timestamp: '00:05'
    },
    { 
      id: "3",
      speaker: 'salesperson', 
      content: "We have several great options. Are you interested in any specific brand?",
      timestamp: '00:12'
    },
    { 
      id: "4",
      speaker: 'customer', 
      content: "I've been using Samsung for years, but I'm open to other suggestions.",
      timestamp: '00:22'
    },
    { 
      id: "5",
      speaker: 'salesperson', 
      content: "Samsung makes excellent cameras. The new Galaxy S23 Ultra has an amazing 108MP camera with great low-light performance. But if you're open to alternatives, the iPhone 14 Pro also has an exceptional camera system.",
      timestamp: '00:28',
      insight: {
        category: 'closing',
        title: {
          uz: "Bitimni yakunlash",
          ru: "Закрытие сделки"
        },
        message: {
          uz: "Mahsulot haqidagi ma'lumotlar juda yaxshi, ammo mijozning ehtiyojlarini ko'proq so'rang. Bu sizga mahsulotni aniqroq tavsiya qilish imkonini beradi.",
          ru: "Отличные сведения о продукте, но рекомендуется задать больше вопросов о потребностях клиента, чтобы сделать более точную рекомендацию."
        }
      }
    },
    { 
      id: "6",
      speaker: 'customer', 
      content: "What about price? What's the difference between them?",
      timestamp: '00:40'
    },
    { 
      id: "7",
      speaker: 'salesperson', 
      content: "The Galaxy S23 Ultra starts at $1,199 and the iPhone 14 Pro starts at $999. Both are premium devices, but they have different ecosystems.",
      timestamp: '00:45'
    },
    { 
      id: "8",
      speaker: 'customer', 
      content: "That's quite expensive. Do you have any mid-range options with good cameras?",
      timestamp: '00:52'
    },
    { 
      id: "9",
      speaker: 'salesperson', 
      content: "Yes, the Google Pixel 7a has one of the best cameras in the mid-range segment, and it's priced at $499. The Samsung Galaxy A54 is also excellent at $449.",
      timestamp: '01:05',
      insight: {
        category: 'opportunity',
        title: {
          uz: "Imkoniyat",
          ru: "Возможность"
        },
        message: {
          uz: "Mijoz narxdan tashvishda. Bu yerda moliyalashtirish yoki chegirma variantlarini taklif qilish juda foydali bo'lar edi.",
          ru: "Клиент обеспокоен ценой. Здесь было бы полезно предложить варианты рассрочки или скидки."
        }
      }
    },
    { 
      id: "10",
      speaker: 'customer', 
      content: "I think I'll take a look at the Pixel 7a. Can I see it?",
      timestamp: '01:15'
    },
    { 
      id: "11",
      speaker: 'salesperson', 
      content: "Absolutely, let me get one for you.",
      timestamp: '01:20',
      insight: {
        category: 'error',
        title: {
          uz: "Xatolik",
          ru: "Ошибка"
        },
        message: {
          uz: "Bu yerda qo'shimcha aksessuarlar yoki himoya rejalari haqida so'rab, savdo hajmini oshirish imkoniyati boy berildi.",
          ru: "Упущена возможность задать вопрос о дополнительных аксессуарах или планах защиты, что могло бы увеличить объем продаж."
        }
      }
    }
  ];

  // Example behavioral insight
  const behavioralInsight = {
    id: "behavior-1",
    type: "behavior" as const,
    content: t("insights.types.behavior.example"),
    skillKey: "trustBuilding"
  };

  // Example custom insight
  const customInsight = {
    id: "custom-1",
    type: "custom" as const,
    content: "Customer showed interest in accessories after seeing the main product.",
    timestamp: "00:35"
  };

  // All insights including standard ones from the conversation
  const allInsights = [
    ...conversation.insights,
    behavioralInsight,
    customInsight
  ];

  // Group insights by type for better organization
  const groupedInsights = {
    urgent: allInsights.filter(i => i.type === "urgent"),
    improvement: allInsights.filter(i => i.type === "improvement"),
    opportunity: allInsights.filter(i => i.type === "opportunity"),
    behavior: allInsights.filter(i => i.type === "behavior"),
    custom: allInsights.filter(i => i.type === "custom")
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {t('conversation.transcript')}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {format(new Date(conversation.date), 'PP')}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <ClockIcon className="mr-1 h-4 w-4" />
            {formatDuration(conversation.duration)}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
            conversation.score >= 90 ? 'bg-insight-green/20 text-insight-green' :
            conversation.score >= 70 ? 'bg-insight-yellow/20 text-insight-yellow' :
            'bg-insight-red/20 text-insight-red'
          }`}>
            <PercentIcon className="mr-1 h-3 w-3" />
            {t('conversation.score')}: {conversation.score}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="transcript" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="transcript">{t('conversation.transcript')}</TabsTrigger>
              <TabsTrigger value="analysis">{t('conversation.insights')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcript">
              <Card>
                <CardContent className="p-6">
                  <TranscriptViewer messages={mockTranscriptWithInsights} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <SkillFeedbackAccordion skills={conversationSkillAnalysisMock} />
                </CardContent>
              </Card>
              
              {/* Critical/Urgent insights - shown first for priority */}
              {groupedInsights.urgent.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-insight-red">
                    {t('insight.type.urgent')} ({groupedInsights.urgent.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInsights.urgent.map(insight => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Improvement insights */}
              {groupedInsights.improvement.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-insight-green">
                    {t('insight.type.improvement')} ({groupedInsights.improvement.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInsights.improvement.map(insight => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Opportunity insights */}
              {groupedInsights.opportunity.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-insight-yellow">
                    {t('insight.type.opportunity')} ({groupedInsights.opportunity.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInsights.opportunity.map(insight => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Behavior insights */}
              {groupedInsights.behavior.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-gray-600">
                    {t('insight.type.behavior')} ({groupedInsights.behavior.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInsights.behavior.map(insight => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Custom insights */}
              {groupedInsights.custom.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-blue-600">
                    {t('insight.type.custom')} ({groupedInsights.custom.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInsights.custom.map(insight => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Empty state when no insights are available */}
              {Object.values(groupedInsights).every(group => group.length === 0) && (
                <Card className="p-8 text-center text-muted-foreground">
                  {t('sales.noAnalysisAvailable')}
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('conversation.recommendations.title')}</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{t('conversation.recommendations.title')}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-green mt-1.5 mr-2" />
                    <span>Offer accessories after customer shows interest in a specific phone model.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-yellow mt-1.5 mr-2" />
                    <span>Address price concerns by highlighting value and financing options earlier.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-insight-green mt-1.5 mr-2" />
                    <span>Continue demonstrating strong product knowledge across multiple brands.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConversationDetail;
