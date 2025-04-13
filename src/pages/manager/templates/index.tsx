
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoleLayout from '@/components/RoleLayout';
import { TemplatesList } from '@/components/templates/TemplatesList';
import { TemplateEditor } from '@/components/templates/TemplateEditor';
import { TemplatePresetList } from '@/components/templates/TemplatePresetList';
import { EvaluationTemplate } from '@/types/templates';
import { mockTemplates } from '@/utils/mockData/templates';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const ManagerTemplates = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<EvaluationTemplate[]>(mockTemplates);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EvaluationTemplate | null>(null);

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setIsEditorOpen(true);
  };

  const handleEditTemplate = (template: EvaluationTemplate) => {
    setEditingTemplate(template);
    setIsEditorOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  const handleSaveTemplate = (template: EvaluationTemplate) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(t => t.id === template.id ? template : t));
    } else {
      // Add new template
      setTemplates([...templates, { ...template, id: `template-${Date.now()}` }]);
    }
    setIsEditorOpen(false);
  };

  return (
    <RoleLayout currentPath="/manager/templates">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('templates.title')}</h1>
          </div>
          <Button 
            onClick={handleAddTemplate} 
            className="mt-2 md:mt-0"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> {t('templates.add')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <TemplatesList 
              templates={templates}
              onEditTemplate={handleEditTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          </div>
          <div className="lg:col-span-4">
            <TemplatePresetList onSelectPreset={handleSaveTemplate} />
          </div>
        </div>

        {isEditorOpen && (
          <TemplateEditor
            template={editingTemplate}
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSaveTemplate}
          />
        )}
      </div>
    </RoleLayout>
  );
};

export default ManagerTemplates;
