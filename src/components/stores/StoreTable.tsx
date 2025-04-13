
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Store, StatusType } from '@/types/stores';

interface StoreTableProps {
  stores: Store[];
  onEdit: (storeId: string) => void;
  onDelete: (storeId: string) => void;
  onAssignSeller: (storeId: string) => void;
}

export const StoreTable: React.FC<StoreTableProps> = ({
  stores,
  onEdit,
  onDelete,
  onAssignSeller,
}) => {
  const { t } = useTranslation();

  const getStatusFromScore = (score: number): StatusType => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  const renderStatusIndicator = (score: number) => {
    const status = getStatusFromScore(score);
    
    const statusColors = {
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500"
    };
    
    return (
      <div className="flex items-center">
        <span 
          className={cn(
            "flex h-2.5 w-2.5 rounded-full mr-2", 
            statusColors[status]
          )}
        />
        <span>{score}</span>
      </div>
    );
  };
  
  // For mobile card view
  const renderMobileCard = (store: Store) => {
    return (
      <div key={store.id} className="bg-card rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{store.name}</h3>
          {renderStatusIndicator(store.score)}
        </div>
        
        {store.location && (
          <p className="text-sm text-muted-foreground mb-2">{store.location}</p>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="text-muted-foreground">{t('stores.sellersCount')}:</span> {store.sellersCount}
          </div>
          <div>
            <span className="text-muted-foreground">{t('stores.lastUpdated')}:</span> {format(store.lastUpdated, 'dd.MM.yyyy')}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(store.id)}>
            <Edit className="h-4 w-4 mr-2" />
            {t('stores.edit')}
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                {t('stores.delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('stores.delete')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('confirm.delete', { item: store.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('actions.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(store.id)}>
                  {t('actions.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button variant="default" size="sm" onClick={() => onAssignSeller(store.id)}>
            <Users className="h-4 w-4 mr-2" />
            {t('stores.assignSeller')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile view: cards */}
      <div className="md:hidden space-y-4">
        {stores.map(store => renderMobileCard(store))}
      </div>
      
      {/* Desktop view: table */}
      <div className="hidden md:block overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('stores.name')}</TableHead>
              <TableHead>{t('stores.location')}</TableHead>
              <TableHead>{t('stores.status')}</TableHead>
              <TableHead className="text-right">{t('stores.sellersCount')}</TableHead>
              <TableHead>{t('stores.lastUpdated')}</TableHead>
              <TableHead>{t('stores.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map(store => (
              <TableRow key={store.id}>
                <TableCell className="font-medium">{store.name}</TableCell>
                <TableCell>{store.location || "—"}</TableCell>
                <TableCell>{renderStatusIndicator(store.score)}</TableCell>
                <TableCell className="text-right">{store.sellersCount}</TableCell>
                <TableCell>{format(store.lastUpdated, 'dd.MM.yyyy')}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(store.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('stores.delete')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('confirm.delete', { item: store.name })}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('actions.cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(store.id)}>
                            {t('actions.confirm')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                    <Button variant="ghost" size="icon" onClick={() => onAssignSeller(store.id)}>
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
