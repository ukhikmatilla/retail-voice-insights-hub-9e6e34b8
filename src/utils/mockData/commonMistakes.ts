
export interface CommonMistake {
  id: string;
  type: string;
  count: number;
  percentage: number;
}

export const mockCommonMistakes: CommonMistake[] = [
  {
    id: 'cm-1',
    type: 'didntClarify',
    count: 87,
    percentage: 24
  },
  {
    id: 'cm-2',
    type: 'noFollowUp',
    count: 65,
    percentage: 18
  },
  {
    id: 'cm-3',
    type: 'rushedExplanation',
    count: 58,
    percentage: 16
  },
  {
    id: 'cm-4',
    type: 'missedUpsell',
    count: 52,
    percentage: 14
  },
  {
    id: 'cm-5',
    type: 'poorObjectionHandling',
    count: 42,
    percentage: 12
  },
  {
    id: 'cm-6',
    type: 'noValueProposition',
    count: 38,
    percentage: 11
  },
  {
    id: 'cm-7',
    type: 'other',
    count: 18,
    percentage: 5
  }
];
