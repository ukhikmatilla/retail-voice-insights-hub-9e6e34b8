
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CalendarIcon, FilterIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const InsightsFilterPanel = () => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedSeller, setSelectedSeller] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('all');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  
  const handleExport = () => {
    // Export functionality
    console.log('Exporting data...');
  };
  
  return (
    <div className="bg-card mb-6 p-4 rounded-lg border flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={selectedStore} onValueChange={setSelectedStore}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t('insights.filters.store')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
            <SelectItem value="store1">Yunusabad Plaza</SelectItem>
            <SelectItem value="store2">Samarkand City</SelectItem>
            <SelectItem value="store3">Bukhara Mall</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedSeller} onValueChange={setSelectedSeller}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t('insights.filters.seller')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
            <SelectItem value="seller1">Anvar Toshmatov</SelectItem>
            <SelectItem value="seller2">Gulnora Karimova</SelectItem>
            <SelectItem value="seller3">Sardor Alimov</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[250px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{t('insights.filters.dateRange')}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t('insights.filters.template')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
            <SelectItem value="template1">{t('insights.templates.productIntro')}</SelectItem>
            <SelectItem value="template2">{t('insights.templates.objectionHandling')}</SelectItem>
            <SelectItem value="template3">{t('insights.templates.crossSelling')}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Mobile filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <FilterIcon className="h-4 w-4 mr-2" />
              {t('insights.filters.title')}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t('insights.filters.title')}</SheetTitle>
            </SheetHeader>
            <div className="py-4 flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('insights.filters.selectStore')}</h3>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                    <SelectItem value="store1">Yunusabad Plaza</SelectItem>
                    <SelectItem value="store2">Samarkand City</SelectItem>
                    <SelectItem value="store3">Bukhara Mall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('insights.filters.selectSeller')}</h3>
                <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                    <SelectItem value="seller1">Anvar Toshmatov</SelectItem>
                    <SelectItem value="seller2">Gulnora Karimova</SelectItem>
                    <SelectItem value="seller3">Sardor Alimov</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('insights.filters.selectDates')}</h3>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>{t('insights.filters.dateRange')}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('insights.filters.selectTemplate')}</h3>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                    <SelectItem value="template1">{t('insights.templates.productIntro')}</SelectItem>
                    <SelectItem value="template2">{t('insights.templates.objectionHandling')}</SelectItem>
                    <SelectItem value="template3">{t('insights.templates.crossSelling')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <Button className="w-full">
                {t('insights.filters.apply')}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Button variant="outline" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        {t('insights.export')}
      </Button>
    </div>
  );
};

export default InsightsFilterPanel;
