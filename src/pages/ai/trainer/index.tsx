
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AiTrainerLayout from '@/components/ai-trainer/AiTrainerLayout';
import ScenarioSelector from '@/components/ai-trainer/ScenarioSelector';
import AiDialogSimulator from '@/components/ai-trainer/AiDialogSimulator';
import AiTrainerFeedback from '@/components/ai-trainer/AiTrainerFeedback';
import TrainingResultSummary from '@/components/ai-trainer/TrainingResultSummary';

type Message = {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

type FeedbackItem = {
  type: 'missed' | 'weak' | 'tip';
  title: string;
  description: string;
};

type Scenario = 'priceObjection' | 'trustBuilding' | 'upsell' | 'finalClosing' | 'followUp';
type SimulationStatus = 'idle' | 'active' | 'completed';

const AiTrainerPage = () => {
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [score, setScore] = useState(0);

  // Mock data for demonstration
  const mockBadges = [
    { id: 'quickThinker', name: t('ai.trainer.badges.quickThinker') },
    { id: 'objectionHandler', name: t('ai.trainer.badges.objectionHandler') },
  ];

  const mockSuggestedModules = [
    {
      id: 'priceObjections',
      name: t('training_content.priceObjections.title'),
      path: '/sales/training/handling-price-objections',
    },
    {
      id: 'trustBuilding',
      name: 'Trust Building Techniques',
      path: '/sales/training/trust-building',
    },
  ];

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setStatus('idle');
    setFeedback([]);
    setScore(0);
  };

  const handleSimulationComplete = (messages: Message[]) => {
    // In a real implementation, this would analyze the conversation and generate feedback
    // using AI or predefined rules.
    
    // Mock feedback based on selected scenario
    generateMockFeedback(selectedScenario);
    
    // Calculate mock score
    const mockScore = Math.floor(Math.random() * 5) + 6; // Random score between 6-10
    setScore(mockScore);
  };

  const generateMockFeedback = (scenario: Scenario | null) => {
    const mockFeedbacks: Record<string, FeedbackItem[]> = {
      'priceObjection': [
        {
          type: 'missed',
          title: 'Value proposition',
          description: "You missed the opportunity to highlight the long-term value of the product."
        },
        {
          type: 'weak',
          title: 'Price justification',
          description: "Your price justification wasn't supported by specific benefits."
        },
        {
          type: 'tip',
          title: 'Focus on ROI',
          description: "Try focusing on return on investment rather than upfront cost."
        },
      ],
      'trustBuilding': [
        {
          type: 'tip',
          title: 'Case studies',
          description: "Share specific success stories to build credibility."
        },
        {
          type: 'tip',
          title: 'Active listening',
          description: "Great job reflecting the customer's concerns back to them."
        },
      ],
      // Add more scenarios here
    };

    if (scenario && mockFeedbacks[scenario]) {
      setFeedback(mockFeedbacks[scenario]);
    } else {
      // Default feedback if scenario doesn't match
      setFeedback([
        {
          type: 'tip',
          title: 'General improvement',
          description: "Try to address customer concerns more directly."
        }
      ]);
    }
  };

  return (
    <AiTrainerLayout>
      <ScenarioSelector
        onSelectScenario={handleSelectScenario}
        selectedScenario={selectedScenario}
      />
      
      <AiDialogSimulator
        scenario={selectedScenario}
        onComplete={handleSimulationComplete}
        status={status}
        setStatus={setStatus}
      />
      
      <AiTrainerFeedback
        feedback={feedback}
        visible={status === 'completed'}
      />
      
      <TrainingResultSummary
        score={score}
        visible={status === 'completed'}
        earnedBadges={mockBadges}
        suggestedModules={mockSuggestedModules}
      />
    </AiTrainerLayout>
  );
};

export default AiTrainerPage;
