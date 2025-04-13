
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Plus, 
  UserCheck,
  Users,
  CheckSquare,
  BookOpen,
} from 'lucide-react';

const ManagerCoaching = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Mock data for coaching sessions
  const upcomingSessions = [
    {
      id: '1',
      title: 'Продажи премиум товаров',
      store: 'Центральный',
      date: '2025-04-15',
      time: '14:00',
      participants: 3,
      skills: ['Презентация продукта', 'Работа с возражениями']
    },
    {
      id: '2',
      title: 'Улучшение конверсии',
      store: 'Южный филиал',
      date: '2025-04-17',
      time: '10:30',
      participants: 5,
      skills: ['Завершение продаж', 'Кросс-продажи']
    }
  ];
  
  const pastSessions = [
    {
      id: '3',
      title: 'Техника SPIN-продаж',
      store: 'Восточный',
      date: '2025-04-08',
      time: '11:00',
      participants: 4,
      completed: true,
      result: 85
    },
    {
      id: '4',
      title: 'Вводный тренинг',
      store: 'Центральный',
      date: '2025-04-01',
      time: '09:45',
      participants: 7,
      completed: true,
      result: 92
    }
  ];

  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t('coaching.sessions')}</h1>
            <p className="text-muted-foreground">
              {t('manager.coachingDescription')}
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>{t('coaching.schedule')}</span>
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">{t('coaching.upcoming')}</TabsTrigger>
            <TabsTrigger value="past">{t('coaching.past')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{session.date}</span>
                          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                          <span>{session.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {session.participants} {t('team.teamMembers').toLowerCase()}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t('store')}: {session.store}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {session.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            {t('common.edit')}
                          </Button>
                          <Button size="sm">
                            {t('common.viewDetails')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">{t('coaching.noSessions')}</p>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    {t('coaching.schedule')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{session.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{t('training.score')}</span>
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            {session.result}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{session.date}</span>
                          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                          <span>{session.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="flex items-center">
                            <CheckSquare className="h-4 w-4 text-green-600 mr-1" />
                            {t('training.completed')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {session.participants} {t('team.teamMembers').toLowerCase()}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t('store')}: {session.store}
                          </p>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-2" />
                            {t('coaching.viewResults')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('coaching.noPastSessions')}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RoleLayout>
  );
};

export default ManagerCoaching;
