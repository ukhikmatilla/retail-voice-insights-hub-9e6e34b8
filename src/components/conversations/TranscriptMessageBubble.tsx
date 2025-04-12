
import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TranscriptMessage } from './TranscriptViewer';

interface TranscriptMessageBubbleProps {
  message: TranscriptMessage;
}

const TranscriptMessageBubble: React.FC<TranscriptMessageBubbleProps> = ({ message }) => {
  const { t } = useTranslation();
  
  const isSalesperson = message.speaker === 'salesperson';
  
  return (
    <div className={cn(
      "flex",
      isSalesperson ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-xl shadow-sm p-3",
        isSalesperson 
          ? "bg-blue-50 text-blue-900" 
          : "bg-gray-100 text-gray-800"
      )}>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            {isSalesperson ? (
              <User className="h-3 w-3 mr-1 text-blue-700" />
            ) : (
              <UserRound className="h-3 w-3 mr-1 text-gray-700" />
            )}
            <span className="text-xs font-medium">
              {t(`conversation.${message.speaker}`)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground ml-4">
            {message.timestamp}
          </span>
        </div>
        <p className="text-sm break-words whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default TranscriptMessageBubble;
