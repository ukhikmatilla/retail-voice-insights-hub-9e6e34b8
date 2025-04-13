
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { mockStores } from '@/utils/mockData';
import { CalendarIcon, Download, FileDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const InsightsFilterPanel: React.FC = () => {
  const { t } = useTranslation();
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [sellerFilter, setSellerFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [template, setTemplate] = useState<string>("all");

  const handleExportCSV = () => {
    // Mock functionality for export to CSV
    console.log("Exporting data as CSV");
  };

  const handleExportPDF = () => {
    // Mock functionality for export to PDF
    console.log("Exporting data as PDF");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>{t('insights.filters.title')}</CardTitle>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <FileDown className="mr-1 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="mr-1 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Store Filter */}
          <div>
            <label className="text-sm font-medium block mb-1">{t('insights.filters.store')}</label>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('insights.filters.selectStore')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                {mockStores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seller Filter */}
          <div>
            <label className="text-sm font-medium block mb-1">{t('insights.filters.seller')}</label>
            <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('insights.filters.selectSeller')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                <SelectItem value="top">Top 5</SelectItem>
                <SelectItem value="bottom">Bottom 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div>
            <label className="text-sm font-medium block mb-1">{t('insights.filters.range')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "P")} - {format(dateRange.to, "P")}
                      </>
                    ) : (
                      format(dateRange.from, "P")
                    )
                  ) : (
                    <span>{t('insights.filters.selectDates')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Template Filter */}
          <div>
            <label className="text-sm font-medium block mb-1">{t('insights.filters.template')}</label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('insights.filters.selectTemplate')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('insights.filters.all')}</SelectItem>
                <SelectItem value="product-intro">{t('insights.templates.productIntro')}</SelectItem>
                <SelectItem value="objection-handling">{t('insights.templates.objectionHandling')}</SelectItem>
                <SelectItem value="cross-selling">{t('insights.templates.crossSelling')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Apply Filters Button */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-2">
            <Button className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {t('insights.filters.apply')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsFilterPanel;
