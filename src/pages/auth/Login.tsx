
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LanguageSelector from '@/components/LanguageSelector';
import { LogInIcon, AlertCircleIcon } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(t('auth.requiredField'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo mode - quick login
  const handleDemoLogin = async (role: 'salesperson' | 'manager' | 'hr') => {
    setIsLoading(true);
    const demoEmails = {
      salesperson: 'aziz@example.com',
      manager: 'dilnoza@example.com',
      hr: 'mikhail@example.com'
    };
    
    try {
      await login(demoEmails[role], 'password');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">RetailVoiceAI</h1>
          <LanguageSelector />
        </div>
        
        <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">{t('auth.login')}</h2>
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('auth.login')}
                {!isLoading && <LogInIcon className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-6">
              <p className="text-center text-sm text-muted-foreground">
                {t('app.name')} demo logins:
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('salesperson')}
                  disabled={isLoading}
                >
                  Salesperson
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('manager')}
                  disabled={isLoading}
                >
                  Manager
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('hr')}
                  disabled={isLoading}
                >
                  HR
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.register')}?{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                  {t('auth.register')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
