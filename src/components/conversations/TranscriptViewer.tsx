
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranscriptMessageBubble, { TranscriptMessage } from './TranscriptMessageBubble';
import TranscriptEmptyState from './TranscriptEmptyState';

interface TranscriptViewerProps {
  messages: TranscriptMessage[];
  isLoading?: boolean;
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ 
  messages, 
  isLoading = false 
}) => {
  const { t } = useTranslation();

  const handleDownloadTranscript = () => {
    // Create transcript content
    const content = messages.map(msg => {
      const speakerLabel = t(`conversation.${msg.speaker}`);
      return `[${msg.timestamp}] ${speakerLabel}: ${msg.content}`;
    }).join('\n\n');
    
    // Create download link
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    
    // Trigger download
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 animate-pulse">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return <TranscriptEmptyState />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{t('conversation.transcript')}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadTranscript}
          className="text-xs"
        >
          <Download className="h-3 w-3 mr-1" />
          {t('conversation.downloadTranscript')}
        </Button>
      </div>
      
      <div className="space-y-0 pb-2">
        {messages.map((message) => (
          <TranscriptMessageBubble 
            key={message.id} 
            message={message} 
          />
        ))}
      </div>
    </div>
  );
};

export default TranscriptViewer;
