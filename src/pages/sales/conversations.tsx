
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useConversations } from '@/hooks/useConversations';
import {
    CONVERSATION_DATE_DATA_KEY,
    CONVERSATION_DURATION_DATA_KEY,
    CONVERSATION_SCORE_DATA_KEY,
    INSIGHT_CONTENT_DATA_KEY,
    INSIGHT_TYPE_DATA_KEY,
} from '@/constants/conversationDataKeys';
import { FilterSelector } from '@/components/FilterSelector';
import { Pagination } from '@/components/ui/pagination';


const SalesConversations = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // Используем useNavigate для навигации между страницами
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [scoreFilter, setScoreFilter] = useState([0]);
  const [dateFilter, setDateFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  // Состояние для определения порядка сортировки (по возрастанию или убыванию)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: conversations,
    currentPage,
    totalPages,
    totalItems,
    error,
  } = useConversations({
    searchQuery,
    scoreFilter,
    dateFilter,
    languageFilter,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  // Обработчик изменения страницы
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Обработчик изменения размера страницы
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  // Обработчик нажатия на "View Details"
  const handleViewDetails = (conversationId: string) => {
    navigate(`/sales/conversations/${conversationId}`);
  };

  // Иконка сортировки (по возрастанию или убыванию)
  const sortIcon = useMemo(() => {
    return sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
  }, [sortOrder]);

  return (
    <RoleLayout currentPath={location.pathname}>
      {/* Основной контейнер страницы */}
      <div className="animate-fade-in">
        {/* Заголовок страницы */}
        <h1 className="text-3xl font-bold mb-3">{t('sales.conversations')}</h1>
        <p className="text-muted-foreground mb-6">
          {t('sales.conversationsDescription')}
        </p>

        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            {/* Поле поиска */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('common.search')}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Кнопка открытия/закрытия фильтра */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={isFilterOpen ? "bg-accent" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Фильтр (показывается/скрывается по нажатию на кнопку) */}
          {isFilterOpen && (
            <Card className="p-4 space-y-4 animate-fade-in">
              <CardHeader>
                <CardTitle>{t('sales.filterConversations')}</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('sales.scoreThreshold')}: {scoreFilter[0]}
                </p>
                {/* Слайдер для выбора порога оценки */}
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  value={scoreFilter}
                  onValueChange={setScoreFilter}
                  aria-label={t('sales.scoreThreshold')}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  {/* Фильтр по дате */}
                  <FilterSelector
                    label={t('common.date')}
                    value={dateFilter}
                    onValueChange={setDateFilter}
                    options={[
                      { value: 'all', label: t('common.allTime') },
                      { value: 'week', label: t('common.thisWeek') },
                      { value: 'month', label: t('common.thisMonth') },
                    ]}
                    placeholder={t('sales.dateRange')}
                  />
                </div>

                <div className="space-y-2">
                  {/* Фильтр по языку */}
                  <FilterSelector
                    label={t('common.language')}
                    value={languageFilter}
                    onValueChange={setLanguageFilter}
                    options={[
                      { value: 'all', label: t('common.allLanguages') },
                      { value: 'uz', label: t('common.uzbekLanguage') },
                      { value: 'ru', label: t('common.russianLanguage') },
                    ]}
                    placeholder={t('sales.language')}
                  />
                </div>
              </div>
            </Card>
          )}{/* Закрытие фильтра */}
        </div>

        {/* Отображение контента в зависимости от наличия ошибки */}
        {error ? (
          <Card className="p-8 text-center text-muted-foreground">
            {/* Вывод сообщения об ошибке, если есть */}
            {t('sales.error')}
          </Card>
        ) : (
          <>
            {/* Информация о количестве элементов и элементы управления */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                {t('common.totalItems', { count: totalItems })}
              </p>
              <div className="flex items-center gap-2">
                {/* Кнопка сортировки */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortIcon}
                  {sortBy === "date" ? t('common.date') : t('sales.score')}
                </Button>
                {/* Выбор количества элементов на странице */}
                <Select value={String(pageSize)} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue placeholder={t('common.pageSize', { size: pageSize })} />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20].map((size) => (
                      <SelectItem key={size} value={String(size)}>{t('common.pageSizeOption', { size: size })}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Список разговоров */}
            <div className="space-y-4">
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className="p-5 hover:border-primary/50 cursor-pointer transition-all"
                    onClick={() => handleViewDetails(conversation.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm text-muted-foreground">
                        {/* Форматирование даты */}
                        {format(new Date(conversation.date), 'PP', { locale: i18n.language })}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${conversation.score >= 90 ? 'bg-green-100 text-green-700' : conversation.score >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {t('sales.score')}: {t('sales.scoreValue', { score: conversation.score })}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm">
                        {/* Отображение продолжительности разговора */}
                        {t('sales.duration')}: {Math.floor(conversation.duration / 60)}:{/* минуты */}{(conversation.duration % 60).toString().padStart(2, '0')/* секунды */}
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* Отображение инсайтов (не более одного) */}
                      {conversation.insights.slice(0, 1).map((insight) => (
                        <div
                          key={insight.id}
                          className={`p-3 text-sm rounded-md ${insight.type === 'improvement' ? 'bg-green-50 text-green-700' : insight.type === 'opportunity' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}
                        >
                          {insight.content}
                        </div>
                      ))}
                      {/* Если инсайтов больше одного, отобразить количество дополнительных инсайтов */}
                      {conversation.insights.length > 1 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          +{conversation.insights.length - 1} {t('sales.insights')}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm" className="text-xs">
                        {t('sales.viewDetails')} →
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center text-muted-foreground">
                  {/* Сообщение об отсутствии разговоров */}
                  {searchQuery || scoreFilter[0] > 0 ? t('sales.error') : t('sales.noConversations')}
                </Card>
              )}
            </div>
            {/* Пагинация */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </RoleLayout>
  );
};

export default SalesConversations;
