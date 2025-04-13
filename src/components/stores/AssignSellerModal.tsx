
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useMobile } from '@/hooks/use-mobile';

interface AssignSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sellerCount: number) => void;
  storeName: string;
}

// Mock data for unassigned sellers
const mockUnassignedSellers = [
  { id: 's1', name: 'Alex Johnson' },
  { id: 's2', name: 'Maria Garcia' },
  { id: 's3', name: 'Ivan Petrov' },
  { id: 's4', name: 'Umida Karimova' },
];

export const AssignSellerModal: React.FC<AssignSellerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  storeName,
}) => {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [sellerCount, setSellerCount] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(sellerCount);
  };
  
  const ModalContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {t('stores.assignSellerDescription', { store: storeName })}
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="sellerCount">{t('stores.sellerCountToAssign')}</Label>
            <Input 
              id="sellerCount"
              type="number" 
              min="1" 
              max="10"
              value={sellerCount}
              onChange={(e) => setSellerCount(parseInt(e.target.value) || 1)}
              className="mt-2"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose}>
          {t('actions.cancel')}
        </Button>
        <Button type="submit">
          {t('actions.assign')}
        </Button>
      </div>
    </form>
  );
  
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('stores.assignSeller')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            {ModalContent}
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('stores.assignSeller')}</DialogTitle>
        </DialogHeader>
        {ModalContent}
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};
