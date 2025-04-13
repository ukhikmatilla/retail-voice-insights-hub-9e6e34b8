
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMobile } from '@/hooks/use-mobile';
import { Store, StoreFormData } from '@/types/stores';

interface StoreFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData & { id?: string }) => void;
  mode: 'add' | 'edit';
  initialData?: Store;
}

export const StoreFormModal: React.FC<StoreFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const { t } = useTranslation();
  const isMobile = useMobile();
  
  const formSchema = z.object({
    name: z.string().min(1, t('validation.required')),
    location: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      location: initialData?.location || '',
    },
  });
  
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (mode === 'edit' && initialData) {
      onSubmit({ ...data, id: initialData.id });
    } else {
      onSubmit(data);
    }
    form.reset();
  };

  const title = mode === 'add' ? t('stores.add') : t('stores.edit');
  
  const FormContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('stores.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('stores.name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('stores.location')}</FormLabel>
              <FormControl>
                <Input placeholder={t('stores.location')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            {t('actions.cancel')}
          </Button>
          <Button type="submit">
            {mode === 'add' ? t('actions.create') : t('actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
  
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            {FormContent}
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {FormContent}
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};
