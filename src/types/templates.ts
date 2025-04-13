
export type TemplateType = 'manual' | 'ai';

export interface EvaluationCriterion {
  id: string;
  text: string;
}

export interface EvaluationTemplate {
  id: string;
  name: string;
  type: TemplateType;
  criteria: EvaluationCriterion[];
  assignedTo?: {
    stores?: string[];
    sellers?: string[];
  };
}

export interface TemplatePreset {
  id: string;
  nameKey: string; // Translation key
  type: TemplateType;
  criteria: string[]; // Array of criteria text
}
