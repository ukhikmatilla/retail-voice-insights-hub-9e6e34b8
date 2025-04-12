
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, PercentIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationDetailHeaderProps {
  date: string;
  score: number;
  duration: number;
  formatDuration: (seconds: number) => string;
}

const ConversationDetailHeader: React.FC<ConversationDetailHeaderProps> = ({
  date,
  score,
  duration,
  formatDuration
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
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
          {format(new Date(date), 'PP')}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <ClockIcon className="mr-1 h-4 w-4" />
          {formatDuration(duration)}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
          score >= 90 ? 'bg-insight-green/20 text-insight-green' :
          score >= 70 ? 'bg-insight-yellow/20 text-insight-yellow' :
          'bg-insight-red/20 text-insight-red'
        }`}>
          <PercentIcon className="mr-1 h-3 w-3" />
          {t('conversation.score')}: {score}
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailHeader;
