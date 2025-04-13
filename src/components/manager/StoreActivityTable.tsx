
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for store activity
const mockStores = [
  { id: 1, name: 'Центральный', conversations: 42, averageScore: 87, status: 'good' },
  { id: 2, name: 'Проспект Мира', conversations: 38, averageScore: 92, status: 'good' },
  { id: 3, name: 'Восточный', conversations: 15, averageScore: 65, status: 'warning' },
  { id: 4, name: 'Торговый Центр', conversations: 27, averageScore: 73, status: 'warning' },
  { id: 5, name: 'Западный', conversations: 8, averageScore: 43, status: 'critical' },
];

// Type for status
type StatusType = 'good' | 'warning' | 'critical' | 'unknown';

// Status badges for different states
const StatusBadge = ({ status }: { status: StatusType | string }) => {
  const { t } = useTranslation();
  
  let color = '';
  let statusText = '';
  
  switch (status) {
    case 'good':
      color = 'bg-green-400';
      statusText = t('dashboard.activity.status.good');
      break;
    case 'warning':
      color = 'bg-yellow-400';
      statusText = t('dashboard.activity.status.warning');
      break;
    case 'critical':
      color = 'bg-red-400';
      statusText = t('dashboard.activity.status.critical');
      break;
    default:
      color = 'bg-gray-400';
      statusText = t('dashboard.activity.status.unknown');
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className={`${color} h-2.5 w-2.5 rounded-full`}></div>
      <span className="text-sm">{statusText}</span>
    </div>
  );
};

// Status summary component
const StatusSummary = () => {
  const { t } = useTranslation();
  
  // Count stores by status
  const statusCounts = mockStores.reduce((acc, store) => {
    // Cast the status to StatusType to ensure it's a valid key
    const status = store.status as StatusType;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {} as Record<StatusType, number>);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status} className="flex flex-col items-center p-2 border rounded-md">
          <StatusBadge status={status} />
          <span className="mt-1 font-bold">{count}</span>
        </div>
      ))}
    </div>
  );
};

// Mobile view using accordion
const MobileStoreList = ({ stores }: { stores: typeof mockStores }) => {
  const { t } = useTranslation();
  
  return (
    <div className="md:hidden space-y-2">
      <Accordion type="single" collapsible className="w-full">
        {stores.map((store) => (
          <AccordionItem key={store.id} value={`store-${store.id}`}>
            <AccordionTrigger className="py-2">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="font-medium">{store.name}</span>
                <StatusBadge status={store.status} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 py-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t('dashboard.activity.conversations')}
                  </span>
                  <span>{store.conversations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t('dashboard.activity.score')}
                  </span>
                  <span>{store.averageScore}%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  {t('dashboard.activity.viewDetails')}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// Desktop view using table
const StoreActivityTable: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.activity.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Status Summary */}
        <StatusSummary />
        
        {/* Mobile View */}
        <MobileStoreList stores={mockStores} />
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8">
                    {t('dashboard.activity.store')}
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8">
                    {t('dashboard.activity.conversations')}
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8">
                    {t('dashboard.activity.score')}
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>{t('dashboard.activity.status')}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.conversations}</TableCell>
                  <TableCell>{store.averageScore}%</TableCell>
                  <TableCell>
                    <StatusBadge status={store.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
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

export default StoreActivityTable;
