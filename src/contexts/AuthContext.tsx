
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: string, language: 'uz' | 'ru') => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Mock login with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          toast({
            title: t('auth.loginSuccess'),
          });
          resolve(user);
        } else {
          toast({
            title: t('auth.invalidCredentials'),
            variant: "destructive",
          });
          reject(new Error(t('auth.invalidCredentials')));
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, role: string, language: 'uz' | 'ru'): Promise<User> => {
    // Mock register with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new user
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          role: role as 'salesperson' | 'manager' | 'hr',
          language,
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast({
          title: t('auth.registerSuccess'),
        });
        
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('onboardingComplete');
    // Don't clear language as it should persist even after logout
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
