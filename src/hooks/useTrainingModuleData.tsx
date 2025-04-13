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
    ) || {
      id: '1',
      title: t('training_content.priceObjections.title'),
      description: t('training_content.priceObjections.description'),
      skill: t('training_content.priceObjections.skill', { defaultValue: 'objections' }),
      level: t('training_content.priceObjections.level', { defaultValue: 'intermediate' }),
      status: 'recommended',
      progress: 0,
      dueDate: '2025-05-01'
    };

    setTraining(foundTraining);
    
    // Set document title
    document.title = foundTraining.title + ' | ' + t('sales.training');

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
  }, [slug, t]);

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
      title: "Price Objections Theory",
      content: "Main content of the theory",
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
      question: "Main quiz question",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 2",
      explanation: "Explanation for the quiz",
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
