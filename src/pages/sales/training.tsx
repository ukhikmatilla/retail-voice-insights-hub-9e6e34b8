
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import RoleLayout from '@/components/RoleLayout';
import MicroTrainingCard from '@/components/MicroTrainingCard';
import BadgeBoard from '@/components/BadgeBoard';
import TrainingHeader from '@/components/training/TrainingHeader';
import TrainingModuleList from '@/components/training/TrainingModuleList';
import TrainingProgressChart from '@/components/training/TrainingProgressChart';
import { generateProgressData } from '@/utils/trainingUtils';
import { mockMicroTraining, mockScriptSnippets, mockBadges, mockStreak } from '@/data/mockData';
import { trainingModules as mockTrainingModules } from '@/data/trainingModules';
import { useTrainingFilters } from '@/hooks/useTrainingFilters';
import { FilterSelector } from '@/components/FilterSelector';
import { ALL_TEXT, BEGINNER_TEXT, INTERMEDIATE_TEXT, ADVANCED_TEXT, RECOMMENDED_TEXT, IN_PROGRESS_TEXT, COMPLETED_TEXT, ASSIGNED_TEXT, OBJECTIONS_TEXT, TRUST_BUILDING_TEXT, CROSS_SELLING_TEXT, CLOSING_TEXT, VALUE_EXPLANATION_TEXT } from '@/constants/trainingTexts';
import { Training } from '@/types';

// Mock training modules with correct status types
const trainingModules: Training[] = [
  {
    id: '1',
    title: 'Handling Price Objections',
    description: 'Learn effective strategies to address price concerns from customers.',
    skill: 'objections',
    level: 'intermediate',
    status: 'recommended',
    progress: 0,
    dueDate: '2025-05-01'
  },
  {
    id: '2',
    title: 'Building Initial Trust',
    description: 'Master the art of establishing trust in the first minutes of customer interaction.',
    skill: 'trustBuilding',
    level: 'beginner',
    status: 'inProgress',
    progress: 35,
    dueDate: '2025-04-25'
  },
  {
    id: '3',
    title: 'Effective Cross-selling',
    description: 'Discover techniques to increase basket size through relevant recommendations.',
    skill: 'crossSelling',
    level: 'advanced',
    status: 'inProgress',
    progress: 75,
    dueDate: '2025-04-20'
  },
  {
    id: '4',
    title: 'Advanced Closing Techniques',
    description: 'Learn psychology-based approaches to closing sales with higher success rates.',
    skill: 'closing',
    level: 'advanced',
    status: 'completed',
    progress: 100,
    completedDate: '2025-04-01'
  },
  {
    id: '5',
    title: 'Value Communication',
    description: 'Learn how to effectively communicate product value rather than features.',
    skill: 'valueExplanation',
    level: 'intermediate',
    status: 'completed',
    progress: 100,
    completedDate: '2025-03-15'
  },
  {
    id: '6',
    title: 'Understanding Customer Signals',
    description: 'Recognize verbal and non-verbal cues to better address customer needs.',
    skill: 'trustBuilding',
    level: 'intermediate',
    status: 'assigned',
    progress: 0,
    dueDate: '2025-05-10'
  }
];

const SalesTraining = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [filters, setFilters] = useState({
    skill: ALL_TEXT,
    level: ALL_TEXT,
    status: ALL_TEXT,
  });
  
  // Progress chart data
  const progressData = generateProgressData();
  
  // Find recommended module for AI goal
  const recommendedModule = mockTrainingModules.find(module => module.status === 'recommended') || mockTrainingModules[0];

  const { filteredModules } = useTrainingFilters(mockTrainingModules, filters);

  const skillOptions = [
    { value: ALL_TEXT, label: t('training.filters.all') },
    { value: OBJECTIONS_TEXT, label: t('training.skills.objections') },
    { value: TRUST_BUILDING_TEXT, label: t('training.skills.trustBuilding') },
    { value: CROSS_SELLING_TEXT, label: t('training.skills.crossSelling') },
    { value: CLOSING_TEXT, label: t('training.skills.closing') },
    { value: VALUE_EXPLANATION_TEXT, label: t('training.skills.valueExplanation') },
  ];

  const levelOptions = [
    { value: ALL_TEXT, label: t('training.filters.all') },
    { value: BEGINNER_TEXT, label: t('training.levels.beginner') },
    { value: INTERMEDIATE_TEXT, label: t('training.levels.intermediate') },
    { value: ADVANCED_TEXT, label: t('training.levels.advanced') },
  ];

  
  return (
    <RoleLayout currentPath={location.pathname}>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">{t('sales.training')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('sales.trainingDescription')}
        </p>
        
        {/* AI Goal of the Week */}
        <div className="mb-8">
          <TrainingHeader recommendedModule={recommendedModule} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Left side on desktop, top on mobile */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {/* Filter Panel */}
            <div className="space-y-6">
            <FilterSelector
              value={filters.skill}
              onValueChange={(value) => setFilters({ ...filters, skill: value })}
              placeholder={t('training.filters.skill') || ''}
              options={skillOptions}
            />

            <FilterSelector
              value={filters.level}
              onValueChange={(value) => setFilters({ ...filters, level: value })}
              placeholder={t('training.filters.level') || ''}
              options={levelOptions}
            />

            {/* Status Filter (Dropdown) */}
            <FilterSelector
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
              placeholder={t('training.filters.status') || ''}
              options={[
                { value: ALL_TEXT, label: t('training.filters.all') },
                { value: RECOMMENDED_TEXT, label: t('training.statuses.recommended') },
                { value: IN_PROGRESS_TEXT, label: t('training.statuses.inProgress') },
                { value: COMPLETED_TEXT, label: t('training.statuses.completed') },
                { value: ASSIGNED_TEXT, label: t('training.statuses.assigned') },
              ]}
            />
              
              
              
              
              
              
              {/* Micro-Training of the Day */}
              <MicroTrainingCard microTraining={mockMicroTraining} />
            </div>
          </div>
          
          {/* Training Modules and other content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <h2 className="text-xl font-semibold mb-4">{t('sales.trainingModules')}</h2>
            
            {/* Training Module List */}
            <TrainingModuleList modules={filteredModules} />
            
            {/* Progress Chart */}
            <div className="mb-8">
              <TrainingProgressChart data={progressData} />
            </div>
            
            {/* Gamification and Challenges */}
            <div>
              <BadgeBoard badges={mockBadges} streak={mockStreak} />
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default SalesTraining;
