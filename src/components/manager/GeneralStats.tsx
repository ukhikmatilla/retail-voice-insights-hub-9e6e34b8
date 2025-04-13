
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, MessageCircle, Star } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockData = {
  stores: 12,
  sellers: 48,
  conversations: {
    weekly: 156,
    monthly: 672
  },
  rating: 4.7
};

const GeneralStats: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            {t('dashboard.stats.stores')}
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.stores}</div>
          <p className="text-xs text-muted-foreground">
            {t('dashboard.stats.active')}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            {t('dashboard.stats.sellers')}
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.sellers}</div>
          <p className="text-xs text-muted-foreground">
            {t('dashboard.stats.active')}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            {t('dashboard.stats.conversations')}
          </CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.conversations.weekly}</div>
          <p className="text-xs text-muted-foreground">
            {t('dashboard.stats.conversationsMonthly', { count: mockData.conversations.monthly })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            {t('dashboard.stats.rating')}
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.rating}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(mockData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralStats;
