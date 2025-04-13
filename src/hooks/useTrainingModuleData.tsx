
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mockTrainings } from '@/data/mockData';
import { Training, TrainingTheory, TheorySection, TrainingQuiz, QuizQuestion } from '@/types';

export const useTrainingModuleData = (slug: string | undefined) => {
  const { t } = useTranslation();
  const [training, setTraining] = useState<Training | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Find training by slug
    const foundTraining = mockTrainings.find(
      (module) => module.title.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (foundTraining) {
      setTraining(foundTraining);
    } else {
      // Create a default training object with correct typing
      const defaultTraining: Training = {
        id: '1',
        title: t('training_content.priceObjections.title'),
        description: t('training_content.priceObjections.description'),
        skill: t('training_content.priceObjections.skill', { defaultValue: 'objection' }),
        level: 'intermediate' as const,
        status: 'recommended',
        progress: 0,
        dueDate: '2025-05-01'
      };
      setTraining(defaultTraining);
    }
    
    // Set document title
    document.title = training?.title ? training.title + ' | ' + t('sales.training') : t('sales.training');

    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      document.title = t('sales.training');
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [slug, t, training?.title]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return {
    training,
    isMobile,
    sidebarOpen,
    toggleSidebar
  };
};

// Create theory data from translations
export const useTheoryData = () => {
  const { t } = useTranslation();
  
  const getTheoryData = (): TrainingTheory => {
    const moduleKey = 'priceObjections';
    
    return {
      id: "theory-1",
      title: t(`training_content.${moduleKey}.theory.title`, { defaultValue: "Price Objections Theory" }),
      content: t(`training_content.${moduleKey}.theory.content`, { defaultValue: "Main content of the theory" }),
      sections: [
        {
          title: t(`training_content.${moduleKey}.theory.section1.title`),
          content: t(`training_content.${moduleKey}.theory.section1.content`),
          type: "text"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section2.title`),
          content: t(`training_content.${moduleKey}.theory.section2.content`),
          type: "warning"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section3.title`),
          content: t(`training_content.${moduleKey}.theory.section3.content`),
          type: "tip"
        },
        {
          title: t(`training_content.${moduleKey}.theory.section4.title`),
          content: t(`training_content.${moduleKey}.theory.section4.content`),
          type: "example"
        }
      ] 
    };
  };

  return getTheoryData();
};

// Create quiz data from translations
export const useQuizData = () => {
  const { t } = useTranslation();
  
  const getQuizData = (): TrainingQuiz => {
    const moduleKey = 'priceObjections';
    
    return {
      id: "quiz-1",
      question: t(`training_content.${moduleKey}.steps.quiz.mainQuestion`, { defaultValue: "Main quiz question" }),
      options: [
        t(`training_content.${moduleKey}.steps.quiz.mainOptions.0`, { defaultValue: "Option 1" }), 
        t(`training_content.${moduleKey}.steps.quiz.mainOptions.1`, { defaultValue: "Option 2" }), 
        t(`training_content.${moduleKey}.steps.quiz.mainOptions.2`, { defaultValue: "Option 3" }), 
        t(`training_content.${moduleKey}.steps.quiz.mainOptions.3`, { defaultValue: "Option 4" })
      ],
      correctAnswer: t(`training_content.${moduleKey}.steps.quiz.mainCorrectAnswer`, { defaultValue: "Option 2" }),
      explanation: t(`training_content.${moduleKey}.steps.quiz.mainExplanation`, { defaultValue: "Explanation for the quiz" }),
      questions: [
        {
          id: "q1",
          question: t(`training_content.${moduleKey}.steps.quiz.question1.question`),
          options: [
            t(`training_content.${moduleKey}.steps.quiz.question1.options.0`),
            t(`training_content.${moduleKey}.steps.quiz.question1.options.1`),
            t(`training_content.${moduleKey}.steps.quiz.question1.options.2`),
            t(`training_content.${moduleKey}.steps.quiz.question1.options.3`)
          ],
          correctAnswer: 1,
          explanation: t(`training_content.${moduleKey}.steps.quiz.question1.explanation`, { defaultValue: "" })
        },
        {
          id: "q2",
          question: t(`training_content.${moduleKey}.steps.quiz.question2.question`),
          options: [
            t(`training_content.${moduleKey}.steps.quiz.question2.options.0`),
            t(`training_content.${moduleKey}.steps.quiz.question2.options.1`),
            t(`training_content.${moduleKey}.steps.quiz.question2.options.2`),
            t(`training_content.${moduleKey}.steps.quiz.question2.options.3`)
          ],
          correctAnswer: 0,
          explanation: t(`training_content.${moduleKey}.steps.quiz.question2.explanation`, { defaultValue: "" })
        }
      ],
      passingScore: 70
    };
  };

  return getQuizData();
};

// Video data
export const useVideoData = () => {
  return {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "10:25"
  };
};
