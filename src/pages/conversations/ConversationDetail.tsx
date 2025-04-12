import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { mockConversations } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { conversationSkillAnalysisMock } from '@/mocks/conversationSkillAnalysis';
import { formatDuration } from '@/utils/formatters';
import ConversationDetailHeader from './components/ConversationDetailHeader';
import TranscriptTabContent from './components/TranscriptTabContent';
import InsightsTabContent from './components/InsightsTabContent';
import RecommendationsSidebar from './components/RecommendationsSidebar';
import { TranscriptMessage } from '@/components/conversations/TranscriptViewer';

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const conversation = mockConversations.find(c => c.id === id);
  
  if (!conversation) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">{t('common.error')}</h2>
          <Button onClick={() => navigate('/dashboard')}>
            {t('common.back')}
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
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
  
  // Sample recommendations for sidebar with translated content
  const recommendations = [
    {
      label: t('insight.type.improvement'),
      text: t('insights.types.improvement.example'),
      type: "improvement" as const
    },
    {
      label: t('insight.type.opportunity'),
      text: t('insights.types.opportunity.example'),
      type: "opportunity" as const
    },
    {
      label: t('insight.type.improvement'),
      text: t('insights.types.behavior.example'),
      type: "improvement" as const
    }
  ];

  // Get conversation language and device
  const conversationLanguage = conversation.language || 'Uzbek 🇺🇿';
  const conversationDevice = conversation.device || 'iPhone 14';

  return (
    <DashboardLayout>
      <ConversationDetailHeader 
        date={conversation.date}
        score={conversation.score}
        duration={conversation.duration}
        formatDuration={formatDuration}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="transcript" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="transcript">{t('conversation.transcript')}</TabsTrigger>
              <TabsTrigger value="analysis">{t('conversation.insights')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcript">
              <TranscriptTabContent messages={mockTranscriptWithInsights} />
            </TabsContent>
            
            <TabsContent value="analysis">
              <InsightsTabContent 
                skills={conversationSkillAnalysisMock} 
                groupedInsights={groupedInsights} 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <RecommendationsSidebar recommendations={recommendations} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConversationDetail;
