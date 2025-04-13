
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, isAfter } from 'date-fns';
import { BookOpen, Check, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import { Training } from '@/types';

interface TrainingModuleCardProps {
  training: Training;
}

const TrainingModuleCard: React.FC<TrainingModuleCardProps> = ({ training }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'recommended':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'assigned':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'inProgress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'recommended':
        return <Lightbulb className="h-3.5 w-3.5 mr-1" />;
      case 'inProgress':
        return <Clock className="h-3.5 w-3.5 mr-1" />;
      case 'completed':
        return <Check className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };
  
  const getSkillIcon = () => {
    return <BookOpen className="h-4 w-4" />;
  };
  
  // Calculate if training is overdue
  const isOverdue = () => {
    if (!training.dueDate) return false;
    
    const dueDate = new Date(training.dueDate);
    const today = new Date();
    
    return isAfter(today, dueDate) && training.status !== 'completed';
  };

  // Get the translation key for the module
  const getModuleKey = () => {
    // Create a slug from the title to match our translation keys
    const titleSlug = training.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'); // Handle multiple dashes
      
    if (titleSlug.includes('price') || titleSlug.includes('narx') || titleSlug.includes('цен')) {
      return 'priceObjections';
    }
    if (titleSlug.includes('trust') || titleSlug.includes('ишонч') || titleSlug.includes('довер')) {
      return 'buildTrust';
    }
    if (titleSlug.includes('cross') || titleSlug.includes('кросс') || titleSlug.includes('qoshimcha')) {
      return 'crossSell';
    }
    if (titleSlug.includes('clos') || titleSlug.includes('битим') || titleSlug.includes('завер')) {
      return 'closing';
    }
    if (titleSlug.includes('value') || titleSlug.includes('qiymat') || titleSlug.includes('ценн')) {
      return 'valueComm';
    }
    if (titleSlug.includes('signal') || titleSlug.includes('сигнал') || titleSlug.includes('signal')) {
      return 'customerSignals';
    }
    
    // Default to the original title if no match
    return '';
  };

  // Get translated content based on the module
  const getTranslatedContent = () => {
    const moduleKey = getModuleKey();
    
    if (moduleKey) {
      return {
        title: t(`modules.${moduleKey}.title`, { defaultValue: training.title }),
        description: t(`modules.${moduleKey}.description`, { defaultValue: training.description }),
        level: t(`modules.${moduleKey}.level`, { defaultValue: training.level })
      };
    }
    
    return {
      title: training.title,
      description: training.description,
      level: training.level
    };
  };

  // Handle button click based on training module
  const handleButtonClick = () => {
    // Create URL-friendly slug from title
    const slug = training.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/sales/training/${slug}`);
  };

  const translatedContent = getTranslatedContent();

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={`${getStatusColor(training.status)} flex items-center px-2 py-0.5`}>
            {getStatusIcon(training.status)}
            {t(`training.${training.status === 'recommended' ? 'recommended' : `status.${training.status}`}`)}
          </Badge>
        </div>
        
        <h3 className="font-medium mb-2 line-clamp-2">{translatedContent.title}</h3>
        
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <span className="flex items-center mr-3">
            {getSkillIcon()}
            <span className="ml-1">{t(`insights.${training.skill}`)}</span>
          </span>
          <span className="capitalize">{t(`training.${translatedContent.level.toLowerCase()}`, { defaultValue: translatedContent.level })}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {translatedContent.description}
        </p>
        
        {training.dueDate && training.status !== 'completed' && (
          <div className="text-xs text-muted-foreground mb-3">
            {isOverdue() ? (
              <span className="text-destructive font-medium">
                {t('training.overdue')}: {format(new Date(training.dueDate), 'PP')}
              </span>
            ) : (
              <span>
                {t('label.dueDate', { defaultValue: t('training.dueDate') })}: {format(new Date(training.dueDate), 'PP')}
              </span>
            )}
          </div>
        )}
        
        {training.completedDate && training.status === 'completed' && (
          <div className="text-xs text-muted-foreground mb-3">
            {t('label.completedDate', { defaultValue: t('training.completed') })}: {format(new Date(training.completedDate), 'PP')}
          </div>
        )}
        
        {training.progress > 0 && training.progress < 100 && (
          <div className="mt-2">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${training.progress}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-right text-muted-foreground">
              {training.progress}% {t('training.complete')}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 py-3 border-t bg-muted/50">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full flex items-center"
          onClick={handleButtonClick}
        >
          {training.status === 'completed' 
            ? t('button.viewCertificate', { defaultValue: t('training.viewCertificate') })
            : training.status === 'inProgress' 
              ? t('button.continue', { defaultValue: t('training.continue') })
              : t('button.start', { defaultValue: t('training.start') })}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingModuleCard;
