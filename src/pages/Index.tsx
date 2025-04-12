
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // Check if onboarding is completed
    const isOnboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    
    if (!isLoading) {
      if (!isOnboardingComplete) {
        navigate('/onboarding');
      } else if (!user) {
        navigate('/auth/login');
      } else {
        // Route based on user role
        switch (user.role) {
          case 'salesperson':
            navigate('/sales/dashboard');
            break;
          case 'manager':
            navigate('/manager/dashboard');
            break;
          case 'hr':
            navigate('/hr/dashboard');
            break;
          default:
            navigate('/auth/select-role');
        }
      }
    }
  }, [navigate, user, isLoading]);
  
  return null;
};

export default Index;
