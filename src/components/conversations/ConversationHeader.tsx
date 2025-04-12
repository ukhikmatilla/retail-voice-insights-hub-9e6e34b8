
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ConversationHeaderProps {
  date: string;
  score: number;
  duration: number;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  date,
  score,
  duration
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formattedDate = format(new Date(date), 'PPP');

  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/sales/conversations')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('common.back')}
      </Button>
      
      <div>
        <h1 className="text-3xl font-bold">
          {t('conversation.title', { date: formattedDate })}
        </h1>
        <div className="flex items-center mt-2 space-x-2">
          <Badge 
            variant={score >= 90 ? "default" : score >= 70 ? "secondary" : "destructive"}
          >
            {t('conversation.score')}: {score}/100
          </Badge>
          <Badge variant="outline">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default ConversationHeader;
