
import { useTranslation } from 'react-i18next';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FeedbackItem = {
  type: 'missed' | 'weak' | 'tip';
  title: string;
  description: string;
};

interface AiTrainerFeedbackProps {
  feedback: FeedbackItem[];
  visible: boolean;
}

const AiTrainerFeedback = ({ feedback, visible }: AiTrainerFeedbackProps) => {
  const { t } = useTranslation();

  if (!visible) return null;

  // Group feedback by type
  const missedObjections = feedback.filter(item => item.type === 'missed');
  const weakAnswers = feedback.filter(item => item.type === 'weak');
  const tips = feedback.filter(item => item.type === 'tip');

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('ai.trainer.feedbackTitle')}</CardTitle>
        <CardDescription>
          {t('ai.trainer.feedback.tips')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {missedObjections.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="missed-objections">
              <AccordionTrigger className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>{t('ai.trainer.feedback.missedObjections')}</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-8">
                  {missedObjections.map((item, index) => (
                    <li key={`missed-${index}`} className="list-disc">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {weakAnswers.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="weak-answers">
              <AccordionTrigger className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>{t('ai.trainer.feedback.weakAnswers')}</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-8">
                  {weakAnswers.map((item, index) => (
                    <li key={`weak-${index}`} className="list-disc">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {tips.length > 0 && (
          <Accordion type="single" collapsible className="w-full" defaultValue="ai-tips">
            <AccordionItem value="ai-tips">
              <AccordionTrigger className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{t('ai.trainer.feedback.tips')}</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-8">
                  {tips.map((item, index) => (
                    <li key={`tip-${index}`} className="list-disc">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default AiTrainerFeedback;
