
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DollarSign, Shield, TrendingUp, CheckSquare, PhoneForwarded 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent 
} from '@/components/ui/card';

type Scenario = 'priceObjection' | 'trustBuilding' | 'upsell' | 'finalClosing' | 'followUp';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: Scenario) => void;
  selectedScenario: Scenario | null;
}

const scenarios: { id: Scenario; icon: React.ReactNode }[] = [
  { id: 'priceObjection', icon: <DollarSign className="h-5 w-5" /> },
  { id: 'trustBuilding', icon: <Shield className="h-5 w-5" /> },
  { id: 'upsell', icon: <TrendingUp className="h-5 w-5" /> },
  { id: 'finalClosing', icon: <CheckSquare className="h-5 w-5" /> },
  { id: 'followUp', icon: <PhoneForwarded className="h-5 w-5" /> }
];

const ScenarioSelector = ({ onSelectScenario, selectedScenario }: ScenarioSelectorProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('ai.trainer.selectScenario')}</CardTitle>
        <CardDescription>
          {selectedScenario 
            ? t(`ai.trainer.scenarios.${selectedScenario}`)
            : t('ai.trainer.start')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 overflow-x-auto">
          {scenarios.map((scenario) => (
            <Button
              key={scenario.id}
              variant={selectedScenario === scenario.id ? "default" : "outline"}
              className="flex flex-col gap-2 h-auto py-4"
              onClick={() => onSelectScenario(scenario.id)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {scenario.icon}
              </div>
              <span className="text-xs text-center">
                {t(`ai.trainer.scenarios.${scenario.id}`)}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioSelector;
