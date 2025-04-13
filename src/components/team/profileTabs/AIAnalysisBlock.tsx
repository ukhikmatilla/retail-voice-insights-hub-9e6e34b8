
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Check, 
  Zap, 
  BarChart3
} from 'lucide-react';
import { mockMemberDetails } from '@/utils/mockData';

// Define types for our AI analysis data
interface AnalysisItem {
  text: string;
  type: 'strong' | 'weak' | 'neutral';
}

interface AIAnalysisData {
  strongPoints: string[];
  weakPoints: string[];
  behaviorProfile: string;
  templateScore: { score: number; total: number };
  recommendation: string;
  projection: {
    status: 'good' | 'bad' | 'warn';
    trend: string;
  };
}

// Mock analysis data - in a real app, this would come from an API
const getMockAnalysis = (memberId: string): AIAnalysisData => {
  // Return different data based on member ID to simulate real analysis
  if (memberId === '1') {
    return {
      strongPoints: ['team.aiInsights.strengths.empathy', 'team.aiInsights.strengths.script', 'team.aiInsights.strengths.price'],
      weakPoints: ['team.aiInsights.weaknesses.closing', 'team.aiInsights.weaknesses.needs'],
      behaviorProfile: 'team.aiInsights.behaviors.confident',
      templateScore: { score: 6, total: 10 },
      recommendation: 'team.aiInsights.recommendations.objections',
      projection: { status: 'good', trend: '+8%' }
    };
  }
  
  // Default data for other members
  return {
    strongPoints: ['team.aiInsights.strengths.listening', 'team.aiInsights.strengths.product'],
    weakPoints: ['team.aiInsights.weaknesses.confidence', 'team.aiInsights.weaknesses.technical'],
    behaviorProfile: 'team.aiInsights.behaviors.friendly',
    templateScore: { score: 4, total: 10 },
    recommendation: 'team.aiInsights.recommendations.confidence',
    projection: { status: 'warn', trend: '+2%' }
  };
};

interface AIAnalysisBlockProps {
  memberId: string;
}

export const AIAnalysisBlock: React.FC<AIAnalysisBlockProps> = ({ memberId }) => {
  const { t } = useTranslation();
  const analysis = getMockAnalysis(memberId);

  const getStatusColor = (status: 'good' | 'bad' | 'warn') => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'bad':
        return 'text-red-500';
      case 'warn':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Zap className="h-5 w-5 mr-2 text-purple-500" />
        {t('team.aiInsights.title')}
      </h3>

      {/* Strong sides */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-green-600 flex items-center mb-2">
          <Check className="h-4 w-4 mr-1" />
          {t('team.aiInsights.strong')}
        </h4>
        <ul className="pl-6 list-disc text-sm">
          {analysis.strongPoints.map((point, idx) => (
            <li key={idx} className="text-gray-700">{t(point)}</li>
          ))}
        </ul>
      </div>

      {/* Weak sides */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-amber-600 flex items-center mb-2">
          <AlertCircle className="h-4 w-4 mr-1" />
          {t('team.aiInsights.weak')}
        </h4>
        <ul className="pl-6 list-disc text-sm">
          {analysis.weakPoints.map((point, idx) => (
            <li key={idx} className="text-gray-700">{t(point)}</li>
          ))}
        </ul>
      </div>

      {/* Behavior profile */}
      <div className="mb-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-500">{t('team.aiInsights.behavior')}:</span>
        <span className="text-sm font-medium">{t(analysis.behaviorProfile)}</span>
      </div>

      {/* Template match */}
      <div className="mb-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-500">{t('team.aiInsights.template')}:</span>
        <span className="text-sm font-medium">
          {analysis.templateScore.score} / {analysis.templateScore.total}
        </span>
      </div>

      {/* AI recommendation */}
      <div className="mb-4 border-t pt-3">
        <h4 className="text-sm font-medium text-blue-600 flex items-center mb-2">
          <Zap className="h-4 w-4 mr-1" />
          {t('team.aiInsights.recommend')}:
        </h4>
        <p className="text-sm bg-blue-50 p-2 rounded">{t(analysis.recommendation)}</p>
      </div>

      {/* Future projection */}
      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-500">{t('team.aiInsights.projection')}:</span>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${getStatusColor(analysis.projection.status)}`}>
            {t(`team.aiInsights.status.${analysis.projection.status}`)}
          </span>
          <span className="text-xs ml-2 flex items-center">
            {analysis.projection.trend.startsWith('+') ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            {analysis.projection.trend}
          </span>
        </div>
      </div>
    </div>
  );
};
