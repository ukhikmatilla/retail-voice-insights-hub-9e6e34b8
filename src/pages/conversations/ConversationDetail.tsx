
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
  
  // Enhanced transcript with inline AI insights and dual-language support
  const mockTranscriptWithInsights: TranscriptMessage[] = [
    { 
      id: "1",
      speaker: 'salesperson', 
      timestamp: '00:00',
      translations: {
        uz: 'Salom! Do\'konimizga xush kelibsiz. Sizga qanday yordam bera olaman?',
        ru: 'Здравствуйте! Добро пожаловать в наш магазин. Как я могу вам помочь?'
      },
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
      timestamp: '00:05',
      translations: {
        uz: "Salom, men yaxshi kamerali yangi smartfon qidiryapman.",
        ru: "Здравствуйте, я ищу новый смартфон с хорошей камерой."
      }
    },
    { 
      id: "3",
      speaker: 'salesperson', 
      timestamp: '00:12',
      translations: {
        uz: "Bizda bir nechta ajoyib variantlar bor. Biror brend bilan qiziqasizmi?",
        ru: "У нас есть несколько отличных вариантов. Интересуетесь какой-то конкретной маркой?"
      }
    },
    { 
      id: "4",
      speaker: 'customer', 
      timestamp: '00:22',
      translations: {
        uz: "Men yillar davomida Samsung ishlatganman, lekin boshqa takliflarga ham ochiqman.",
        ru: "Я годами пользовался Samsung, но открыт и для других предложений."
      }
    },
    { 
      id: "5",
      speaker: 'salesperson', 
      timestamp: '00:28',
      translations: {
        uz: "Samsung ajoyib kameralar yaratadi. Yangi Galaxy S23 Ultra ajoyib 108MP kamera va yaxshi kam yorug'lik ko'rsatkichlariga ega. Ammo agar alternativalarni o'ylayotgan bo'lsangiz, iPhone 14 Pro ham ajoyib kamera tizimiga ega.",
        ru: "Samsung создает отличные камеры. Новый Galaxy S23 Ultra имеет потрясающую 108-мегапиксельную камеру с отличной работой при слабом освещении. Но если вы рассматриваете альтернативы, iPhone 14 Pro также имеет исключительную систему камер."
      },
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
      timestamp: '00:40',
      translations: {
        uz: "Narxi qanday? Ular orasida qanday farq bor?",
        ru: "А как насчет цены? В чем разница между ними?"
      }
    },
    { 
      id: "7",
      speaker: 'salesperson', 
      timestamp: '00:45',
      translations: {
        uz: "Galaxy S23 Ultra narxi 1,199 dollardan boshlanadi va iPhone 14 Pro narxi 999 dollardan boshlanadi. Ikkalasi ham premium qurilmalar, lekin turli ekotizimlarga ega.",
        ru: "Galaxy S23 Ultra стоит от 1199 долларов, а iPhone 14 Pro - от 999 долларов. Оба являются премиальными устройствами, но имеют разные экосистемы."
      }
    },
    { 
      id: "8",
      speaker: 'customer', 
      timestamp: '00:52',
      translations: {
        uz: "Bu ancha qimmat ekan. Yaxshi kamerali o'rta narxdagi variantlaringiz bormi?",
        ru: "Это довольно дорого. У вас есть варианты среднего ценового сегмента с хорошими камерами?"
      }
    },
    { 
      id: "9",
      speaker: 'salesperson', 
      timestamp: '01:05',
      translations: {
        uz: "Ha, Google Pixel 7a o'rta narx segmentida eng yaxshi kameralardan biriga ega va narxi 499 dollar. Samsung Galaxy A54 ham 449 dollar narxi bilan ajoyib.",
        ru: "Да, Google Pixel 7a имеет одну из лучших камер в среднем сегменте и стоит 499 долларов. Samsung Galaxy A54 также отличный вариант за 449 долларов."
      },
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
      timestamp: '01:15',
      translations: {
        uz: "Men Pixel 7a'ga qarab ko'rsam bo'ladi deb o'ylayman. Uni ko'rsating.",
        ru: "Думаю, я посмотрю на Pixel 7a. Можно его увидеть?"
      }
    },
    { 
      id: "11",
      speaker: 'salesperson', 
      timestamp: '01:20',
      translations: {
        uz: "Albatta, sizga birini olib kelaman.",
        ru: "Конечно, сейчас принесу вам один."
      },
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
