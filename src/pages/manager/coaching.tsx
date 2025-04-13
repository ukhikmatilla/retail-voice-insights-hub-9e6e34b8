
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, TrendingUp, Award, BookOpen, ChevronDown, ChevronUp, User, BarChart } from 'lucide-react';
import RoleLayout from '@/components/RoleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ExpandableInsightCard from '@/components/insights/ExpandableInsightCard';
import { mockSellerTrainingData } from '@/utils/coachingMockData';

const ManagerCoaching = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedSeller, setExpandedSeller] = useState<string | null>(null);
  
  // Mock data for sellers and their training progress
  const sellers = mockSellerTrainingData();

  // Mock store data for the leaderboard
  const stores = [
    { id: '1', name: 'Центральный / Markaziy', completedModules: 23, totalSellers: 5, progress: 78 },
    { id: '2', name: 'Южный / Janubiy', completedModules: 18, totalSellers: 4, progress: 65 },
    { id: '3', name: 'Восточный / Sharqiy', completedModules: 29, totalSellers: 6, progress: 92 },
  ];

  const toggleSeller = (sellerId: string) => {
    if (expandedSeller === sellerId) {
      setExpandedSeller(null);
    } else {
      setExpandedSeller(sellerId);
    }
  };

  const getProgressColorClass = (progress: number) => {
    if (progress >= 80) return 'bg-insight-green';
    if (progress >= 60) return 'bg-insight-yellow';
    return 'bg-insight-red';
  };
  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in space-y-8">
        <h1 className="text-3xl font-bold mb-2">{t('manager.coaching')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('manager.coachingDescription')}
        </p>

        {/* AI Recommendations Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('coaching.recommendations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpandableInsightCard
              id="coaching-insight-1"
              type="improvement"
              content={t('coaching.aiRecommendation1')}
              skillKey="questioning"
            />
            <ExpandableInsightCard
              id="coaching-insight-2"
              type="opportunity"
              content={t('coaching.aiRecommendation2')}
              skillKey="objections"
            />
          </div>
        </section>

        {/* Training Progress Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{t('coaching.sellerProgress')}</h2>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('coaching.assignModule')}
            </Button>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">{t('coaching.seller')}</TableHead>
                  <TableHead>{t('coaching.completedModules')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('coaching.lastActivity')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('coaching.progress')}</TableHead>
                  <TableHead className="text-right">{t('coaching.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellers.map((seller) => (
                  <React.Fragment key={seller.id}>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                            <User className="w-4 h-4" />
                          </div>
                          {seller.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {seller.completedModules} / {seller.totalModules}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {seller.lastActivity.date}
                          <Clock className="w-4 h-4 ml-2 mr-1" />
                          {seller.lastActivity.time}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${getProgressColorClass(seller.progressPercent)}`} 
                              style={{ width: `${seller.progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm whitespace-nowrap">{seller.progressPercent}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSeller(seller.id)}
                        >
                          {expandedSeller === seller.id ? (
                            <ChevronUp className="w-4 h-4 mr-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 mr-1" />
                          )}
                          {t('coaching.details')}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedSeller === seller.id && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <div className="p-4 bg-muted/50">
                            <h4 className="font-medium mb-2">{t('coaching.recentModules')}</h4>
                            <div className="space-y-2">
                              {seller.modules.map((module, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-card rounded border">
                                  <div>
                                    <p className="font-medium">{module.title}</p>
                                    <p className="text-sm text-muted-foreground">{module.completedDate}</p>
                                  </div>
                                  <div className={`px-2 py-1 rounded text-xs ${
                                    module.status === 'completed' 
                                      ? 'bg-insight-green/10 text-insight-green' 
                                      : 'bg-insight-yellow/10 text-insight-yellow'
                                  }`}>
                                    {t(`training.status.${module.status}`)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">{t('coaching.recommendedModules')}</h4>
                              <div className="space-y-2">
                                {seller.recommendedModules.map((module, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 bg-card rounded border">
                                    <div className="flex items-start gap-2">
                                      <TrendingUp className="w-4 h-4 text-insight-yellow mt-1" />
                                      <div>
                                        <p className="font-medium">{module.title}</p>
                                        <p className="text-sm text-muted-foreground">{t('coaching.basedOnPerformance')}</p>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="secondary">
                                      {t('coaching.assign')}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('coaching.storeLeaderboard')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stores.map((store, index) => (
              <Card key={store.id} className={index === 0 ? "border-insight-green/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {store.name}
                    </CardTitle>
                    {index === 0 && <Award className="w-5 h-5 text-insight-green" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('coaching.completedModules')}</span>
                      <span className="font-medium">{store.completedModules}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('coaching.sellerCount')}</span>
                      <span className="font-medium">{store.totalSellers}</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground">{t('coaching.progress')}</span>
                        <span className="font-medium">{store.progress}%</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getProgressColorClass(store.progress)}`} 
                          style={{ width: `${store.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    <BarChart className="w-4 h-4 mr-2" />
                    {t('coaching.viewDetails')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </RoleLayout>
  );
};

export default ManagerCoaching;
