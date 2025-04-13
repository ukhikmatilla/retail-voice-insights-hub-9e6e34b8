
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Building,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EvaluationTemplate } from '@/types/templates';

interface TemplatesListProps {
  templates: EvaluationTemplate[];
  onEditTemplate: (template: EvaluationTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const TemplatesList: React.FC<TemplatesListProps> = ({ 
  templates, 
  onEditTemplate, 
  onDeleteTemplate 
}) => {
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);

  const handleDeleteClick = (templateId: string) => {
    setTemplateToDelete(templateId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (templateToDelete) {
      onDeleteTemplate(templateToDelete);
      setTemplateToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const toggleExpanded = (templateId: string) => {
    setExpandedTemplateId(expandedTemplateId === templateId ? null : templateId);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('templates.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">{t('templates.noTemplates')}</p>
              <p className="text-sm">{t('templates.createFirst')}</p>
            </div>
          ) : (
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('templates.name')}</TableHead>
                    <TableHead>{t('templates.type')}</TableHead>
                    <TableHead>{t('templates.criteria')}</TableHead>
                    <TableHead className="text-right">{t('templates.assignTo')}</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map(template => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant={template.type === 'manual' ? 'outline' : 'secondary'}>
                          {t(`templates.type${template.type === 'manual' ? 'Manual' : 'AI'}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.criteria.length}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {template.assignedTo?.stores?.length ? (
                            <Badge variant="outline" className="flex gap-1 items-center">
                              <Building className="h-3 w-3" />
                              {template.assignedTo.stores.length}
                            </Badge>
                          ) : null}
                          
                          {template.assignedTo?.sellers?.length ? (
                            <Badge variant="outline" className="flex gap-1 items-center">
                              <User className="h-3 w-3" />
                              {template.assignedTo.sellers.length}
                            </Badge>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onEditTemplate(template)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteClick(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {templates.map(template => (
              <Collapsible 
                key={template.id} 
                open={expandedTemplateId === template.id}
                onOpenChange={() => toggleExpanded(template.id)}
              >
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={template.type === 'manual' ? 'outline' : 'secondary'}>
                          {t(`templates.type${template.type === 'manual' ? 'Manual' : 'AI'}`)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {template.criteria.length} {t('templates.criteria')}
                        </span>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {expandedTemplateId === template.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">{t('templates.criteria')}:</h4>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                          {template.criteria.map(criterion => (
                            <li key={criterion.id}>{criterion.text}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {(template.assignedTo?.stores?.length || template.assignedTo?.sellers?.length) ? (
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t('templates.assignTo')}:</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.assignedTo?.stores?.length ? (
                              <Badge variant="outline" className="flex gap-1 items-center">
                                <Building className="h-3 w-3" />
                                {template.assignedTo.stores.length} {t('templates.store')}
                              </Badge>
                            ) : null}
                            
                            {template.assignedTo?.sellers?.length ? (
                              <Badge variant="outline" className="flex gap-1 items-center">
                                <User className="h-3 w-3" />
                                {template.assignedTo.sellers.length} {t('templates.seller')}
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEditTemplate(template)}
                        >
                          <Pencil className="h-4 w-4 mr-2" /> {t('templates.edit')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteClick(template.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> {t('templates.delete')}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}

            {templates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">{t('templates.noTemplates')}</p>
                <p className="text-sm">{t('templates.createFirst')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('templates.delete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('templates.confirmDelete')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('templates.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>{t('templates.yes')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
