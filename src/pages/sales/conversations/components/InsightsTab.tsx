
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SkillFeedbackAccordion from '@/components/ai/SkillFeedbackAccordion';
import InsightSection from '@/components/insights/InsightSection';

interface InsightsTabProps {
  skills: any[];
  insights: any[];
}

const InsightsTab: React.FC<InsightsTabProps> = ({ skills, insights }) => {
  return (
    <>
      {/* Skill Feedback Section */}
      <Card>
        <CardContent className="pt-6">
          <SkillFeedbackAccordion skills={skills} />
        </CardContent>
      </Card>
      
      {/* Insights Analysis Section */}
      <Card className="mt-4">
        <CardContent>
          <InsightSection insights={insights} />
        </CardContent>
      </Card>
    </>
  );
};

export default InsightsTab;
