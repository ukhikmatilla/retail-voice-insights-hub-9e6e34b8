
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { topPerformers, bottomPerformers } from '@/utils/mockData';
import { Link } from 'react-router-dom';

const SellerLeaderboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("top");

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('insights.sellerLeaderboard')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="top" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="top">{t('insights.topPerformers')}</TabsTrigger>
            <TabsTrigger value="bottom">{t('insights.bottomPerformers')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="top" className="mt-0">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('team.table.name')}</TableHead>
                    <TableHead>{t('insights.table.score')}</TableHead>
                    <TableHead>{t('insights.callsCount')}</TableHead>
                    <TableHead>{t('insights.aiComment')}</TableHead>
                    <TableHead>{t('dashboard.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell className="font-medium">{seller.name}</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{seller.score.toFixed(1)}</span>
                      </TableCell>
                      <TableCell>{seller.callsCount}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{seller.aiComment}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/manager/team/${seller.id}`}>
                            <Eye className="mr-1 h-4 w-4" />
                            {t('team.viewProfile')}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="bottom" className="mt-0">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('team.table.name')}</TableHead>
                    <TableHead>{t('insights.table.score')}</TableHead>
                    <TableHead>{t('insights.flaggedCalls')}</TableHead>
                    <TableHead>{t('insights.aiComment')}</TableHead>
                    <TableHead>{t('dashboard.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bottomPerformers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell className="font-medium">{seller.name}</TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{seller.score.toFixed(1)}</span>
                      </TableCell>
                      <TableCell>{seller.flaggedCalls}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{seller.aiComment}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/manager/team/${seller.id}`}>
                            <Eye className="mr-1 h-4 w-4" />
                            {t('team.viewProfile')}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SellerLeaderboard;
