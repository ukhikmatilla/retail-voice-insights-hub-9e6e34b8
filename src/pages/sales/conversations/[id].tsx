import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { nanoid } from 'nanoid';
import { mockConversations } from '@/data/mockData';
import { conversationSkillAnalysisMock } from '@/mocks/conversationSkillAnalysis';
import { expandableInsightsMock } from '@/data/insightsMockData';
import ConversationHeader from './components/ConversationHeader';
import ConversationContent from './components/ConversationContent';
import ConversationSidebar from './components/ConversationSidebar';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Mock transcript data with AI insights for salesperson messages and dual-language support
const mockTranscript = [{
  id: nanoid(),
  speaker: "salesperson" as const,
  timestamp: '00:00',
  translations: {
    uz: 'Salom! Do\'konimizga xush kelibsiz. Qanday yordam bera olaman?',
    ru: 'Здравствуйте! Добро пожаловать в наш магазин. Чем могу помочь?'
  },
  insight: {
    category: 'personalization' as const,
    title: {
      uz: "Shaxsiylashtirish",
      ru: "Персонализация"
    },
    message: {
      uz: "Mijozni salomlashda uning ismini so'rang. Bu shaxsiyroq munosabatni yaratadi.",
      ru: "Спросите имя клиента при приветствии. Это создаст более персонализированное общение."
    }
  }
}, {
  id: nanoid(),
  speaker: "customer" as const,
  timestamp: '00:05',
  translations: {
    uz: 'Salom, menga 30-razmerli bolalar uchun poyabzal kerak.',
    ru: 'Здравствуйте, мне нужны детские туфли, размер 30.'
  }
}, {
  id: nanoid(),
  speaker: "salesperson" as const,
  timestamp: '00:12',
  translations: {
    uz: 'Albatta! Bizda 30-razmerli bolalar uchun bir nechta variantlar bor. Keling, ko\'rsataman.',
    ru: 'Конечно! У нас есть несколько вариантов для детей 30 размера. Позвольте показать вам коллекцию.'
  }
}, {
  id: nanoid(),
  speaker: "customer" as const,
  timestamp: '00:22',
  translations: {
    uz: 'Ular moviy rangdami? O\'g\'limga moviy poyabzal yoqadi.',
    ru: 'А есть в синем цвете? Моему сыну нравятся синие туфли.'
  }
}, {
  id: nanoid(),
  speaker: "salesperson" as const,
  timestamp: '00:28',
  translations: {
    uz: 'Ha, bu modellardan moviy rangda ham bor. Juda qulay va bardoshli, ayniqsa faol bolalar uchun.',
    ru: 'Да, у нас есть такие модели в синем. Они очень удобные и долговечные для активных детей.'
  },
  insight: {
    category: 'opportunity' as const,
    title: {
      uz: "Imkoniyat",
      ru: "Возможность"
    },
    message: {
      uz: "Bu yerda bolaning yoshini so'rab, unga mos poyabzal modellari haqida ko'proq ma'lumot berishingiz mumkin edi.",
      ru: "Здесь вы могли бы спросить о возрасте ребенка, чтобы предложить более подходящие модели обуви."
    }
  }
}, {
  id: nanoid(),
  speaker: "customer" as const,
  timestamp: '00:40',
  translations: {
    uz: 'Zo\'r! Shularni olaman. Narxi qancha?',
    ru: 'Отлично! Беру. Сколько стоит?'
  }
}, {
  id: nanoid(),
  speaker: "salesperson" as const,
  timestamp: '00:45',
  translations: {
    uz: 'Ular 150 000 so\'m turadi. Ularni qutiga solib beraymi?',
    ru: 'Они стоят 150 000 сум. Хотите, я положу их в коробку?'
  },
  insight: {
    category: 'closing' as const,
    title: {
      uz: "Bitimni yakunlash",
      ru: "Закрытие сделки"
    },
    message: {
      uz: "Bu yerda qo'shimcha aksessuarlar (paypoq yoki poyabzal uchun ximoya vositalari) taklif qilishingiz mumkin edi.",
      ru: "Здесь вы могли бы предложить дополнительные аксессуары (носки или средства защиты обуви)."
    }
  }
}, {
  id: nanoid(),
  speaker: "customer" as const,
  timestamp: '00:52',
  translations: {
    uz: 'Ha, albatta. Men olaman.',
    ru: 'Да, пожалуйста. Я их возьму.'
  }
}];

// Mock recommendations
const mockRecommendations = [
  {
    type: 'improvement' as const,
    content: "Ask more open-ended questions to understand customer needs better."
  },
  {
    type: 'opportunity' as const,
    content: "Mention our loyalty program for repeat customers."
  }
];

const ConversationDetail = () => {
  const { id } = useParams<{ id: string; }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Log for debugging
    console.log("Current conversation ID:", id);
    console.log("Available conversations:", mockConversations.map(c => c.id));
  }, [id]);

  // Find the conversation by ID
  const conversation = id ? mockConversations.find(conv => conv.id === id) : null;

  // Return to conversations list if conversation not found
  if (!conversation) {
    return (
      <RoleProtectedRoute allowedRoles={['salesperson']}>
        <RoleLayout currentPath={location.pathname}>
          <div className="animate-fade-in">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/sales/conversations')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>
            </div>
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-2">{t('common.error')}</h2>
              <p className="text-muted-foreground mb-6">{t('conversations.notFound')}</p>
              <Button onClick={() => navigate('/sales/conversations')}>
                {t('common.back')}
              </Button>
            </Card>
          </div>
        </RoleLayout>
      </RoleProtectedRoute>
    );
  }

  const date = conversation?.date || '';
  const score = conversation?.score || 0;
  const duration = conversation?.duration || 0;

  return (
    <RoleProtectedRoute allowedRoles={['salesperson']}>
      <RoleLayout currentPath={location.pathname}>
        <div className="animate-fade-in">
          {/* Header with back button and title */}
          <ConversationHeader 
            date={date} 
            score={score} 
            duration={duration} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left column - main content */}
            <ConversationContent 
              duration={duration}
              transcript={mockTranscript}
              skills={conversationSkillAnalysisMock}
              insights={expandableInsightsMock}
            />
            
            {/* Right column - meta info */}
            <ConversationSidebar 
              date={date}
              duration={duration}
              recommendations={mockRecommendations}
            />
          </div>
        </div>
      </RoleLayout>
    </RoleProtectedRoute>
  );
};

export default ConversationDetail;
