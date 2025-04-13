
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useProfile() {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'manager'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const saveProfile = async (name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(prev => prev ? { ...prev, name } : null);
      return true;
    } catch (err) {
      setError('Error updating profile');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would clear authentication state
      // and redirect to login page
      return true;
    } catch (err) {
      setError('Error logging out');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    loading,
    error,
    saveProfile,
    logout
  };
}

export default useProfile;
