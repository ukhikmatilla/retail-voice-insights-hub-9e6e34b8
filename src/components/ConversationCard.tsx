
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/types';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ConversationCardProps {
  conversation: Conversation;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ conversation }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Format duration from seconds to minutes:seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleViewDetails = () => {
    navigate(`/conversation/${conversation.id}`);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">
            {format(new Date(conversation.date), 'PP')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            conversation.score >= 90 ? 'bg-insight-green/20 text-insight-green' :
            conversation.score >= 70 ? 'bg-insight-yellow/20 text-insight-yellow' :
            'bg-insight-red/20 text-insight-red'
          }`}>
            {t('conversations.score')}: {conversation.score}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="text-sm">
            {t('conversations.duration')}: {formatDuration(conversation.duration)}
          </div>
        </div>

        <div className="mt-4">
          {conversation.insights.slice(0, 1).map(insight => (
            <div 
              key={insight.id}
              className={`p-3 text-sm rounded-md ${
                insight.type === 'improvement' ? 'bg-insight-green/10 text-insight-green' :
                insight.type === 'opportunity' ? 'bg-insight-yellow/10 text-insight-yellow' :
                'bg-insight-red/10 text-insight-red'
              }`}
            >
              {insight.content}
            </div>
          ))}
          {conversation.insights.length > 1 && (
            <div className="mt-2 text-xs text-muted-foreground">
              +{conversation.insights.length - 1} more {t('conversations.insights')}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-end">
        <Button variant="secondary" onClick={handleViewDetails}>
          {t('common.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConversationCard;
