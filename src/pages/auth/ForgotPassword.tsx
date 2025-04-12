
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

// Form schema using zod
const formSchema = z.object({
  email: z.string()
    .email({ message: 'auth.emailInvalid' })
    .min(1, { message: 'auth.emailRequired' })
});

type ForgotPasswordForm = z.infer<typeof formSchema>;

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Development mode for showing the email preview
  const devMode = true;

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsSubmitting(true);
    try {
      // Here you would typically call an API endpoint to send a password reset email
      // For this demo, we'll just simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('auth.resetLinkSent'),
        description: data.email,
      });
      
      setSubmittedEmail(data.email);
      
      // Show email preview in dev mode
      if (devMode) {
        setShowPreview(true);
      }
      form.reset();
    } catch (error) {
      toast({
        title: t('auth.somethingWentWrong'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {t('auth.forgotPasswordTitle')}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.forgotPasswordSubtitle')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t('auth.emailPlaceholder')} 
                        autoComplete="email"
                        className="pr-10"
                        {...field} 
                      />
                    </FormControl>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Info size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">{t('auth.expireTooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  {t('common.loading')}
                </span>
              ) : (
                t('auth.resetPassword')
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Link 
            to="/auth/login" 
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {t('auth.backToLogin')}
          </Link>
        </div>
      </div>

      {/* Email Preview Modal (only in dev mode) */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('auth.previewTitle')}</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              (Development preview only)
            </DialogDescription>
          </DialogHeader>
          
          <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <div className="mb-4 border-b pb-2">
              <p className="text-sm font-medium">To: {submittedEmail}</p>
              <p className="text-sm font-medium">From: no-reply@retailvoiceai.com</p>
              <p className="text-sm font-medium">Subject: Password Reset Request</p>
            </div>
            
            <div className="space-y-4 text-sm">
              <p>{t('auth.previewText')}</p>
              
              <div className="text-center py-2">
                <Button variant="default">
                  {t('auth.previewButton')}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                {t('auth.previewFooter')}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>
              {t('common.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordPage;
