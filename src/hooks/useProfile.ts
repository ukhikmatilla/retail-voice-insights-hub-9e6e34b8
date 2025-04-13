import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UseProfileResult {
  user: User | null;
  error: string | null;
  loading: boolean;
  saveProfile: (name: string) => Promise<void>;
  logout: () => void;
}

const useProfile = (): UseProfileResult => {
  const { user: authUser, logout: authLogout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const saveProfile = async (name: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (user) {
        const updatedUser = { ...user, name: name.trim() };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authLogout();
  };

  return { user, error, loading, saveProfile, logout };
};

export default useProfile;