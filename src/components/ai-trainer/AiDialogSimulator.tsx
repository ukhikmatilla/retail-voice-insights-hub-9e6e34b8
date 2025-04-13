
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Message = {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

type SimulationStatus = 'idle' | 'active' | 'completed';

interface AiDialogSimulatorProps {
  scenario: string | null;
  onComplete: (messages: Message[]) => void;
  status: SimulationStatus;
  setStatus: (status: SimulationStatus) => void;
}

const AiDialogSimulator = ({ 
  scenario, 
  onComplete, 
  status,
  setStatus 
}: AiDialogSimulatorProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated AI responses based on scenario
  const getAiResponse = (scenario: string, userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // In a real implementation, this would call an API
        const responses: Record<string, string[]> = {
          'priceObjection': [
            "I understand this product looks great, but it seems quite expensive for what it offers.",
            "Hmm, I can find similar products for much less elsewhere.",
            "Can you explain why this is worth the premium price?"
          ],
          'trustBuilding': [
            "How many customers are already using this solution?",
            "Can you share some success stories from other clients?",
            "What happens if I'm not satisfied with the results?"
          ],
          // Add responses for other scenarios
          'default': ["Tell me more about your product.", "That's interesting. Can you elaborate?"]
        };
        
        const scenarioResponses = responses[scenario] || responses.default;
        const randomIndex = Math.floor(Math.random() * scenarioResponses.length);
        resolve(scenarioResponses[randomIndex]);
      }, 1500);
    });
  };

  // Start the simulation when scenario is selected
  useEffect(() => {
    if (scenario && status === 'idle') {
      setStatus('active');
      setMessages([
        {
          role: 'ai',
          content: `Hello! I'm interested in your product. ${t('ai.trainer.simulator.startPrompt')}`,
          timestamp: new Date()
        }
      ]);
    }
  }, [scenario, status]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !scenario || status !== 'active') return;
    
    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsAiThinking(true);
    
    // Get AI response
    try {
      const aiResponse = await getAiResponse(scenario, inputValue);
      
      const aiMessage = {
        role: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleEndSimulation = () => {
    setStatus('completed');
    onComplete(messages);
  };

  const handleRestart = () => {
    setMessages([]);
    setStatus('idle');
  };

  return (
    <Card className="mb-6 flex flex-col h-[500px]">
      <CardHeader>
        <CardTitle>{scenario ? t(`ai.trainer.scenarios.${scenario}`) : t('ai.trainer.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] rounded-lg px-4 py-2">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>{t('ai.trainer.simulator.thinking')}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        {status === 'active' ? (
          <div className="grid w-full grid-cols-12 gap-2">
            <div className="col-span-9 md:col-span-10">
              <Input
                placeholder={t('ai.trainer.simulator.yourTurn')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isAiThinking || !scenario}
              />
            </div>
            <div className="col-span-3 md:col-span-2 flex gap-2">
              <Button
                className="w-full"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isAiThinking || !scenario}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">{t('ai.trainer.simulator.send')}</span>
              </Button>
            </div>
            <div className="col-span-12 mt-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleEndSimulation}
              >
                {t('ai.trainer.simulator.endSimulation')}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleRestart}
            variant="outline"
          >
            {t('ai.trainer.simulator.restart')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AiDialogSimulator;
