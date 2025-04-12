
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ConversationMeta from '@/components/conversations/ConversationMeta';
import AiRecommendations from '@/components/conversations/AiRecommendations';
import { useTranslation } from 'react-i18next';

interface ConversationSidebarProps {
  date: string;
  duration: number;
  recommendations: {
    type: 'improvement' | 'opportunity' | 'urgent';
    content: string;
  }[];
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  date,
  duration,
  recommendations
}) => {
  const { i18n } = useTranslation();
  const language = 'Uzbek 🇺🇿';
  const device = 'iPhone 14';

  return (
    <div className="space-y-6">
      {/* Meta information card */}
      <Card>
        <CardContent className="p-6">
          <ConversationMeta
            date={date}
            duration={duration}
            language={language}
            device={device}
          />
        </CardContent>
      </Card>
      
      {/* AI Recommendations */}
      <AiRecommendations recommendations={recommendations} />
    </div>
  );
};

export default ConversationSidebar;
