
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Smartphone, Globe } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { formatLocalizedDate } from '@/utils/formatters';

interface ConversationMetaProps {
  date: string;
  duration: number;
  language?: string;
  device?: string;
  scoreBreakdown?: {
    engagement: number;
    productKnowledge: number;
    closingSkills: number;
    customerSatisfaction: number;
  };
}

const ConversationMeta: React.FC<ConversationMetaProps> = ({
  date,
  duration,
  language = 'uzbek',
  device = 'iPhone 14',
  scoreBreakdown = {
    engagement: 85,
    productKnowledge: 92,
    closingSkills: 78,
    customerSatisfaction: 90
  }
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const formattedDate = formatLocalizedDate(date, currentLanguage);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('conversation.date')}</p>
            <p className="text-sm font-medium">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-left text-xs px-0 mx-0">
              {t('conversation.duration')}
            </p>
            <p className="text-sm font-medium break-words">
              {minutes}:{seconds.toString().padStart(2, '0')} {t('common.min')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('conversation.device')}</p>
            <p className="text-sm font-medium">{device}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('conversation.language')}</p>
            <p className="text-sm font-medium">
              {t(`language.uzbek`)} {t(`language.uzbek_flag`)}
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Score breakdown */}
      <div>
        <h4 className="text-sm font-medium mb-3">{t('conversation.score')} breakdown</h4>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{t('insights.trustBuilding')}</span>
              <span>{scoreBreakdown.engagement}/100</span>
            </div>
            <Progress value={scoreBreakdown.engagement} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{t('insights.valueExplanation')}</span>
              <span>{scoreBreakdown.productKnowledge}/100</span>
            </div>
            <Progress value={scoreBreakdown.productKnowledge} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{t('insights.closing')}</span>
              <span>{scoreBreakdown.closingSkills}/100</span>
            </div>
            <Progress value={scoreBreakdown.closingSkills} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{t('insights.objections')}</span>
              <span>{scoreBreakdown.customerSatisfaction}/100</span>
            </div>
            <Progress value={scoreBreakdown.customerSatisfaction} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMeta;
