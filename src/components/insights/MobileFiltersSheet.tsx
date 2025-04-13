
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DateRangePicker, DateRange } from '@/components/ui/date-range-picker';

export const MobileFiltersSheet = () => {
  const { t } = useTranslation();
  const [insightType, setInsightType] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2023, 4, 15),
    to: new Date(2023, 5, 15),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Filter className="h-4 w-4" />
          {t('filters.filters', 'Фильтры')}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t('filters.filters', 'Фильтры')}</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('filters.insightType', 'Тип инсайта')}
            </label>
            <Select value={insightType} onValueChange={setInsightType}>
              <SelectTrigger>
                <SelectValue placeholder={t('filters.insightType', 'Тип инсайта')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all', 'Все')}</SelectItem>
                <SelectItem value="improvement">{t('insight.type.improvement', 'Улучшение')}</SelectItem>
                <SelectItem value="opportunity">{t('insight.type.opportunity', 'Возможность')}</SelectItem>
                <SelectItem value="urgent">{t('insight.type.urgent', 'Срочно')}</SelectItem>
                <SelectItem value="behavior">{t('insight.type.behavior', 'Поведение')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('filters.skill', 'Навык')}
            </label>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('filters.skill', 'Навык')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all', 'Все')}</SelectItem>
                <SelectItem value="greeting">Приветствие</SelectItem>
                <SelectItem value="needsDiscovery">Выявление потребностей</SelectItem>
                <SelectItem value="presentation">Презентация</SelectItem>
                <SelectItem value="objectionHandling">Работа с возражениями</SelectItem>
                <SelectItem value="closing">Закрытие продажи</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('filters.dateRange', 'Период')}
            </label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
            />
          </div>
          
          <Button className="w-full mt-2">
            {t('filters.apply', 'Применить')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFiltersSheet;
