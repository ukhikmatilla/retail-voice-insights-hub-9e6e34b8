
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { FileAudio, FileText, Play } from 'lucide-react';
import { format } from 'date-fns';
import { Conversation } from '@/utils/mockData/types';

interface ConversationsTabProps {
  conversations: Conversation[];
  selectedTranscriptId: string | null;
  onSelectTranscript: (id: string | null) => void;
}

export const ConversationsTab: React.FC<ConversationsTabProps> = ({
  conversations,
  selectedTranscriptId,
  onSelectTranscript
}) => {
  const { t } = useTranslation();

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-center p-6 text-muted-foreground">
        {t('common.noData')}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-1">
      {conversations.map(conversation => {
        const isActive = selectedTranscriptId === conversation.id;
        
        return (
          <div 
            key={conversation.id}
            className={`rounded-lg border p-3 transition-colors ${
              isActive ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileAudio className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{conversation.fileName}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {conversation.date}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {format(conversation.duration * 1000, 'mm:ss')}
              </div>
              <div className="flex space-x-2">
                {conversation.audioUrl && (
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    {t('conversation.listen')}
                  </Button>
                )}
                {conversation.transcriptUrl && conversation.status === 'done' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${isActive ? 'bg-primary text-primary-foreground' : ''}`} 
                    onClick={() => onSelectTranscript(isActive ? null : conversation.id)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    {t('team.transcript')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
