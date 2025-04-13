
import React from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface AssignSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sellerCount: number) => void;
  storeName: string;
}

const formSchema = z.object({
  sellerCount: z.coerce.number().min(1, 'errorMessages.minOne'),
});

export const AssignSellerModal: React.FC<AssignSellerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  storeName,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerCount: 1,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.sellerCount);
    form.reset();
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('stores.assignSeller')}</DrawerTitle>
            <DrawerDescription>
              {t('stores.assignSellerDescription', { store: storeName })}
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
              <FormField
                control={form.control}
                name="sellerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('stores.sellerCountToAssign')}</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="px-0">
                <Button type="submit">{t('actions.assign')}</Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  {t('actions.cancel')}
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('stores.assignSeller')}</DialogTitle>
          <DialogDescription>
            {t('stores.assignSellerDescription', { store: storeName })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sellerCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('stores.sellerCountToAssign')}</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {t('actions.cancel')}
              </Button>
              <Button type="submit">{t('actions.assign')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
