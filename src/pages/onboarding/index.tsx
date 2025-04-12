
import React from 'react';
import { useTranslation } from 'react-i18next';
import Onboarding from '../Onboarding'; // Reuse existing component

const OnboardingIndex = () => {
  const { t } = useTranslation();
  
  return <Onboarding />;
};

export default OnboardingIndex;
