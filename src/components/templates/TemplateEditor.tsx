
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusIcon, XIcon } from 'lucide-react';
import { EvaluationCriterion, EvaluationTemplate, TemplateType } from '@/types/templates';

interface TemplateEditorProps {
  template: EvaluationTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: EvaluationTemplate) => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  isOpen,
  onClose,
  onSave
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [type, setType] = useState<TemplateType>('manual');
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>([]);
  const [newCriterion, setNewCriterion] = useState('');
  const [assignedStores, setAssignedStores] = useState<string[]>([]);
  const [assignedSellers, setAssignedSellers] = useState<string[]>([]);

  // Initialize form with template data if editing
  useEffect(() => {
    if (template) {
      setName(template.name);
      setType(template.type);
      setCriteria(template.criteria);
      setAssignedStores(template.assignedTo?.stores || []);
      setAssignedSellers(template.assignedTo?.sellers || []);
    } else {
      // Default values for new template
      setName('');
      setType('manual');
      setCriteria([]);
      setAssignedStores([]);
      setAssignedSellers([]);
    }
  }, [template]);

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      const criterion: EvaluationCriterion = {
        id: nanoid(),
        text: newCriterion.trim()
      };
      setCriteria([...criteria, criterion]);
      setNewCriterion('');
    }
  };

  const handleDeleteCriterion = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTemplate: EvaluationTemplate = {
      id: template?.id || '',
      name,
      type,
      criteria,
      assignedTo: {
        stores: assignedStores,
        sellers: assignedSellers
      }
    };
    
    onSave(updatedTemplate);
  };

  // Mock stores and sellers for demo
  const mockStores = [
    { id: 'store-1', name: 'Магазин №1' },
    { id: 'store-2', name: 'Магазин №2' },
    { id: 'store-3', name: 'Магазин №3' }
  ];
  
  const mockSellers = [
    { id: 'user-1', name: 'Иван Петров' },
    { id: 'user-2', name: 'Анна Сидорова' },
    { id: 'user-3', name: 'Алексей Иванов' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {template ? t('templates.edit') : t('templates.add')}
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('templates.name')}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t('templates.type')}</Label>
              <RadioGroup 
                value={type} 
                onValueChange={(value) => setType(value as TemplateType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="type-manual" />
                  <Label htmlFor="type-manual">{t('templates.typeManual')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ai" id="type-ai" />
                  <Label htmlFor="type-ai">{t('templates.typeAI')}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('templates.criteria')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {criteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-center justify-between">
                      <span>{criterion.text}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCriterion(criterion.id)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {criteria.length > 0 && <Separator />}
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder={t('templates.criteriaPlaceholder')}
                      value={newCriterion}
                      onChange={(e) => setNewCriterion(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddCriterion}
                      disabled={!newCriterion.trim()}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      {t('templates.addCriteria')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <h3 className="font-medium">{t('templates.assignTo')}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="stores">{t('templates.store')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      assignedStores.length 
                        ? `${assignedStores.length} ${t('templates.store')}` 
                        : t('templates.loadingStores')
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStores.map(store => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sellers">{t('templates.seller')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      assignedSellers.length 
                        ? `${assignedSellers.length} ${t('templates.seller')}` 
                        : t('templates.loadingSellers')
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSellers.map(seller => (
                      <SelectItem key={seller.id} value={seller.id}>
                        {seller.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('templates.cancel')}
            </Button>
            <Button type="submit">
              {t('templates.save')}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
