
import React from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { EvaluationTemplate } from '@/types/templates';
import { templatePresets } from '@/utils/mockData/templates';

interface TemplatePresetListProps {
  onSelectPreset: (template: EvaluationTemplate) => void;
}

export const TemplatePresetList: React.FC<TemplatePresetListProps> = ({ onSelectPreset }) => {
  const { t } = useTranslation();

  const handleSelectPreset = (presetId: string) => {
    const preset = templatePresets.find(p => p.id === presetId);
    
    if (preset) {
      // Convert preset to a template
      const newTemplate: EvaluationTemplate = {
        id: nanoid(),
        name: t(preset.nameKey),
        type: preset.type,
        criteria: preset.criteria.map(text => ({ 
          id: nanoid(), 
          text 
        })),
        assignedTo: { stores: [], sellers: [] }
      };
      
      onSelectPreset(newTemplate);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('templates.presets')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {templatePresets.map((preset, index) => (
          <React.Fragment key={preset.id}>
            {index > 0 && <Separator className="my-4" />}
            <div>
              <h3 className="font-medium mb-2">{t(preset.nameKey)}</h3>
              <ul className="text-sm text-muted-foreground mb-3 list-disc pl-5">
                {preset.criteria.slice(0, 3).map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
                {preset.criteria.length > 3 && (
                  <li className="text-muted-foreground">
                    +{preset.criteria.length - 3} {t('templates.criteria').toLowerCase()}...
                  </li>
                )}
              </ul>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSelectPreset(preset.id)}
              >
                {t('templates.usePreset')}
              </Button>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
