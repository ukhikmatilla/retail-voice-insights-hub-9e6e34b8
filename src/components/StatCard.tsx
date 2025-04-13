
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  route?: string;
  tooltipKey?: 'total' | 'score' | 'improvement';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  route,
  tooltipKey = 'total'
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleCardClick = () => {
    if (route) {
      navigate(route);
    }
  };

  const renderTooltipContent = () => (
    <div className="max-w-xs">
      <h4 className="font-medium mb-1">{t(`insights.tooltips.${tooltipKey}.title`)}</h4>
      <p className="text-sm">{t(`insights.tooltips.${tooltipKey}.description`)}</p>
      
      {trend && (
        <p className="text-sm mt-2">
          <span className={cn(
            "font-medium",
            trend.isPositive ? "text-insight-green" : "text-insight-red"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span> {t('insights.tooltips.fromLastPeriod')}
        </p>
      )}
      
      {route && (
        <p className="text-xs text-muted-foreground mt-2">
          {t('insights.tooltips.clickForDetails')}
        </p>
      )}
    </div>
  );

  // For desktop - show tooltip on hover
  if (!isMobile) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className={cn("overflow-hidden cursor-pointer hover:bg-accent/5 transition-colors", className)}
              onClick={handleCardClick}
            >
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                  <div className="text-primary">{icon}</div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">{value}</div>
                  {trend && (
                    <div 
                      className={cn(
                        "text-xs font-medium flex items-center",
                        trend.isPositive ? "text-insight-green" : "text-insight-red"
                      )}
                    >
                      {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-popover border border-border">
            {renderTooltipContent()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // For mobile - show drawer on tap
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card 
          className={cn("overflow-hidden cursor-pointer hover:bg-accent/5 transition-colors", className)}
        >
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <div className="text-primary">{icon}</div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-semibold">{value}</div>
              {trend && (
                <div 
                  className={cn(
                    "text-xs font-medium flex items-center",
                    trend.isPositive ? "text-insight-green" : "text-insight-red"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6">
        <div className="mt-6">
          {renderTooltipContent()}
          {route && (
            <div className="mt-4">
              <button 
                onClick={() => navigate(route)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md"
              >
                {t('insights.tooltips.viewDetails')}
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StatCard;
