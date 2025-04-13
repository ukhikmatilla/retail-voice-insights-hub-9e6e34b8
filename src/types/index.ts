export interface TrainingTheory {
  id: string;
  title: string;
  content: string;
}

export interface TrainingQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  skill: string;
  theoryId: string;
  videoId: string;
  quizId: string;
  estimatedTime: string;
}

export interface TrainingStep {
  id: string;
  type: 'intro' | 'theory' | 'video' | 'quiz' | 'aiAdvice';
  moduleId: string;
}

export type ScriptCategory = 'greeting' | 'objection' | 'closing' | 'followUp' | 'pricing' | 'trust' | 'crossSell' | 'other';

export interface ScriptSnippet {
  id: string;
  scenario: string;
  aiAnswer: string;
  category: ScriptCategory;
  source: string;
}
