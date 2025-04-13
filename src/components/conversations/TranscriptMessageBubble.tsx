
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, UserRound, LightbulbIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Enhanced TranscriptMessage interface with insight data and translations
export interface TranscriptMessage {
  id: string;
  speaker: 'salesperson' | 'customer';
  content?: string; // Legacy field (keeping for backward compatibility)
  timestamp: string; // mm:ss format
  translations?: {
    uz: string;
    ru: string;
  };
  insight?: {
    category: 'closing' | 'personalization' | 'error' | 'opportunity';
    title: {
      uz: string;
      ru: string;
    };
    message: {
      uz: string;
      ru: string;
    };
  };
}

// Category color mapping
const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
  closing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  personalization: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  error: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  opportunity: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
};

interface TranscriptMessageBubbleProps {
  message: TranscriptMessage;
}

const TranscriptMessageBubble: React.FC<TranscriptMessageBubbleProps> = ({ message }) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const isSalesperson = message.speaker === 'salesperson';
  const hasInsight = isSalesperson && message.insight;
  
  // Get the current language
  const currentLang = i18n.language as 'uz' | 'ru';
  
  // Handle toggling insight on mobile
  const toggleInsight = () => {
    setIsExpanded(!isExpanded);
  };

  // Get the message text in the current language
  const getMessageText = () => {
    if (message.translations) {
      return message.translations[currentLang];
    }
    return message.content || '';
  };
  
  // Insight content component (shared between mobile and desktop)
  const InsightContent = () => {
    if (!hasInsight || !message.insight) return null;
    
    const colors = categoryColors[message.insight.category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    
    return (
      <div className={cn("p-3 rounded-md border", colors.border, colors.bg)}>
        <div className="flex justify-between items-start mb-2">
          <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", colors.bg, colors.text)}>
            {message.insight.title[currentLang] || message.insight.title.uz}
          </span>
          {isMobile && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleInsight(); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>
        <p className={cn("text-sm", colors.text)}>
          {message.insight.message[currentLang] || message.insight.message.uz}
        </p>
      </div>
    );
  };
  
  return (
    <div className="mb-4">
      <div className={cn(
        "flex",
        isSalesperson ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "max-w-[80%] rounded-xl shadow-sm p-3 relative",
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
            {getMessageText()}
          </p>
          
          {/* Insight icon for salesperson messages with insights */}
          {hasInsight && !isMobile && (
            <HoverCard openDelay={100}>
              <HoverCardTrigger asChild>
                <button 
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-sm hover:shadow"
                  aria-label={t('transcript.showInsight')}
                >
                  <LightbulbIcon size={16} className="text-amber-500" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start" className="w-80 p-0">
                <InsightContent />
              </HoverCardContent>
            </HoverCard>
          )}
          
          {/* Mobile insight trigger */}
          {hasInsight && isMobile && !isExpanded && (
            <button
              onClick={toggleInsight}
              className="absolute right-2 bottom-2 bg-amber-100 rounded-full p-1"
              aria-label={t('transcript.showInsight')}
            >
              <LightbulbIcon size={14} className="text-amber-600" />
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile expanded insight */}
      {hasInsight && isMobile && isExpanded && (
        <div className={cn(
          "mt-2 animate-fade-in",
          isSalesperson ? "ml-auto mr-0 max-w-[80%]" : "mr-auto ml-0 max-w-[80%]"
        )}>
          <InsightContent />
        </div>
      )}
    </div>
  );
};

export default TranscriptMessageBubble;
