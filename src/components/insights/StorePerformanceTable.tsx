
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye } from 'lucide-react';
import { mockStorePerformance } from '@/utils/mockData';
import { Link } from 'react-router-dom';

type SortKey = 'name' | 'averageScore' | 'totalCalls' | 'redFlags';
type SortDirection = 'asc' | 'desc';

const StorePerformanceTable: React.FC = () => {
  const { t } = useTranslation();
  const [sortKey, setSortKey] = useState<SortKey>('averageScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortData = (data: typeof mockStorePerformance) => {
    return [...data].sort((a, b) => {
      if (sortKey === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const getStatusIndicator = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>;
      case 'warning':
        return <span className="h-3 w-3 rounded-full bg-amber-500 inline-block"></span>;
      case 'critical':
        return <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('insights.storePerformance')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center">
                    {t('insights.table.store')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('averageScore')} className="cursor-pointer">
                  <div className="flex items-center">
                    {t('insights.table.score')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('totalCalls')} className="cursor-pointer">
                  <div className="flex items-center">
                    {t('insights.table.calls')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('redFlags')} className="cursor-pointer">
                  <div className="flex items-center">
                    {t('insights.table.flags')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>{t('dashboard.status')}</TableHead>
                <TableHead>{t('dashboard.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortData(mockStorePerformance).map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.averageScore.toFixed(1)}</TableCell>
                  <TableCell>{store.totalCalls}</TableCell>
                  <TableCell>{store.redFlags}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIndicator(store.status)}
                      <span className="capitalize">
                        {t(`insights.status.${store.status}`)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/manager/stores/${store.id}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        {t('common.viewDetails')}
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorePerformanceTable;
