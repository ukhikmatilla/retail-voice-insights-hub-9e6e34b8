
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import OnboardingSlide from '@/components/OnboardingSlide';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { MicIcon, BarChart3Icon, GraduationCapIcon } from 'lucide-react';

const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    // Check if onboarding is already completed
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete === 'true') {
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleNext = () => {
    if (activeSlide < 2) {
      setActiveSlide(activeSlide + 1);
      if (activeSlide === 0) {
        setShowLanguageSelector(false);
      }
    } else {
      // Mark onboarding as complete and redirect to auth
      localStorage.setItem('onboardingComplete', 'true');
      navigate('/auth/login');
    }
  };

  const handleBack = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      if (activeSlide === 1) {
        setShowLanguageSelector(true);
      }
    }
  };

  const slides = [
    {
      title: t('onboarding.welcome.title'),
      description: t('onboarding.welcome.description'),
      illustration: <MicIcon className="w-24 h-24 text-primary" />
    },
    {
      title: t('onboarding.features.title'),
      description: t('onboarding.features.description'),
      illustration: <BarChart3Icon className="w-24 h-24 text-primary" />
    },
    {
      title: t('onboarding.getStarted.title'),
      description: t('onboarding.getStarted.description'),
      illustration: <GraduationCapIcon className="w-24 h-24 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t('app.name', 'RetailVoiceAI')}</h1>
          {showLanguageSelector && <LanguageSelector />}
        </div>
        
        <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
          <div className="min-h-[400px] flex items-center justify-center">
            <OnboardingSlide 
              title={slides[activeSlide].title} 
              description={slides[activeSlide].description}
              illustration={slides[activeSlide].illustration}
            />
          </div>
          
          <div className="p-6 border-t">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === activeSlide 
                        ? 'w-10 bg-primary' 
                        : 'w-2 bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={activeSlide === 0}
              >
                {t('common.back', 'Back')}
              </Button>
              <Button onClick={handleNext}>
                {activeSlide === slides.length - 1 
                  ? t('onboarding.getStarted.button', 'Get Started') 
                  : t('common.next', 'Next')
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
