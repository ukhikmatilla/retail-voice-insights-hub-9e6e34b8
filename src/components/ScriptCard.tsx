
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { ScriptSnippet } from '@/types';

interface ScriptCardProps {
  script: ScriptSnippet;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-full p-2 mt-1 flex-shrink-0">
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h4 className="text-sm font-medium">{script.scenario}</h4>
              <Badge variant="outline" className="capitalize ml-2 text-xs whitespace-nowrap">
                {t(`scripts.categories.${script.category}`)}
              </Badge>
            </div>
            
            {expanded ? (
              <div className="animate-fade-in">
                <div className="bg-muted/50 p-3 rounded-md mb-3">
                  <p className="text-sm">{script.aiAnswer}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {script.source}
                </div>
              </div>
            ) : null}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs mt-2 hover:bg-blue-50 hover:text-blue-700 p-0 h-auto w-full sm:w-auto flex justify-center"
              onClick={toggleExpanded}
            >
              {expanded ? (
                <span className="flex items-center">
                  {t('scripts.hideScript')} <ChevronUp className="h-3 w-3 ml-1" />
                </span>
              ) : (
                <span className="flex items-center">
                  {t('scripts.viewScript')} <ChevronDown className="h-3 w-3 ml-1" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptCard;
