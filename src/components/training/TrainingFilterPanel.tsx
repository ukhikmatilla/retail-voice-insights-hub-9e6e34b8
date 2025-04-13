
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrainingFilterPanelProps {
  filters: {
    skill: string;
    level: string;
    status: string;
  };
  onChange: (filterType: string, value: string) => void;
}

const TrainingFilterPanel: React.FC<TrainingFilterPanelProps> = ({ filters, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 p-4 bg-muted rounded-lg">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 mr-2 opacity-70" />
        <span className="font-medium text-sm">{t('common.search')}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <Select value={filters.skill} onValueChange={(value) => onChange('skill', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.skillFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="trustBuilding">{t('insights.trustBuilding')}</SelectItem>
              <SelectItem value="objections">{t('insights.objections')}</SelectItem>
              <SelectItem value="crossSelling">{t('insights.crossSelling')}</SelectItem>
              <SelectItem value="valueExplanation">{t('insights.valueExplanation')}</SelectItem>
              <SelectItem value="closing">{t('insights.closing')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={filters.level} onValueChange={(value) => onChange('level', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.levelFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={filters.status} onValueChange={(value) => onChange('status', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('training.statusFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
              <SelectItem value="recommended">{t('training.recommended')}</SelectItem>
              <SelectItem value="inProgress">{t('training.inProgress')}</SelectItem>
              <SelectItem value="completed">{t('training.completed')}</SelectItem>
              <SelectItem value="assigned">{t('training.status.assigned')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TrainingFilterPanel;
