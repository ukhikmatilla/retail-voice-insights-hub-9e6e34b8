
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import RoleLayout from '@/components/RoleLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { mockConversations } from '@/data/mockData';

const SalesConversations = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [scoreFilter, setScoreFilter] = useState([0]);
  
  // Filter conversations (simple implementation for now)
  const filteredConversations = mockConversations.filter(conversation => {
    // Score filter
    if (scoreFilter[0] > 0 && conversation.score < scoreFilter[0]) {
      return false;
    }
    
    // Search query (could search in insights content)
    if (searchQuery) {
      const hasMatch = conversation.insights.some(insight => 
        insight.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (!hasMatch) return false;
    }
    
    return true;
  });
  
  const handleViewDetails = (conversationId: string) => {
    navigate(`/sales/conversations/${conversationId}`);
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-3">{t('sales.conversations')}</h1>
        <p className="text-muted-foreground mb-6">
          {t('sales.conversationsDescription')}
        </p>
        
        {/* Search and filter */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('common.search')}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-accent" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {showFilters && (
            <Card className="p-4 space-y-4 animate-fade-in">
              <h3 className="text-sm font-medium">{t('sales.filterConversations')}</h3>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('sales.scoreThreshold')}: {scoreFilter[0]}</p>
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  value={scoreFilter}
                  onValueChange={setScoreFilter}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('conversation.date')}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('sales.dateRange')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('conversation.language')}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('sales.language')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="uz">Uzbek</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => (
              <Card 
                key={conversation.id} 
                className="p-5 hover:border-primary/50 cursor-pointer transition-all"
                onClick={() => handleViewDetails(conversation.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(conversation.date), 'PP')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    conversation.score >= 90 ? 'bg-green-100 text-green-700' :
                    conversation.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {t('conversation.score')}: {conversation.score}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm">
                    {t('conversation.duration')}: {Math.floor(conversation.duration / 60)}:{(conversation.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="mt-4">
                  {conversation.insights.slice(0, 1).map(insight => (
                    <div 
                      key={insight.id}
                      className={`p-3 text-sm rounded-md ${
                        insight.type === 'improvement' ? 'bg-green-50 text-green-700' :
                        insight.type === 'opportunity' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                    >
                      {insight.content}
                    </div>
                  ))}
                  {conversation.insights.length > 1 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      +{conversation.insights.length - 1} {t('conversation.insights').toLowerCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t('common.viewDetails')} →
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              {searchQuery || scoreFilter[0] > 0 ? 
                t('common.error') : 
                t('sales.noConversations')
              }
            </Card>
          )}
        </div>
      </div>
    </RoleLayout>
  );
};

export default SalesConversations;
