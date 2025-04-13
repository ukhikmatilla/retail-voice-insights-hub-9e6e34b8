
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: 'uz' | 'ru';
  notifications: boolean;
  role: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    language: user?.language || 'uz',
    notifications: true,
    role: user?.role || 'salesperson',
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate loading profile data
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        // Here you would fetch from an API
        // For now, we'll just use the user data
        const userData: User | null = user;
        
        if (userData) {
          // Split name into first and last name parts
          const nameParts = userData.name.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          setProfile({
            firstName,
            lastName,
            email: userData.email,
            phone: '', // Mock
            language: userData.language || 'uz',
            notifications: true, // Mock
            role: userData.role,
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [user]);

  const updateProfile = async (updatedProfile: Partial<Profile>) => {
    setIsSaving(true);
    try {
      // Here you would send to an API
      // For now, we'll just update the local state
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    updateProfile,
    isLoading,
    isSaving,
  };
};

export default useProfile;
