'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/lib/api';
import Loading from '@/components/Loading';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth.verifyEmail');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setError(t('error.missingToken'));
      return;
    }

    let countdownInterval: NodeJS.Timeout | null = null;

    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        
        if (response.ok) {
          setStatus('success');
          // Remove token from URL immediately
          router.replace('/verify-email');
          
          // Start countdown
          countdownInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                if (countdownInterval) {
                  clearInterval(countdownInterval);
                }
                router.push('/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else if (response.status === 400 || response.status === 401) {
          setStatus('error');
          const data = await response.json().catch(() => ({}));
          setError(data.message || t('error.description'));
          router.replace('/verify-email');
        } else {
          setStatus('error');
          setError(t('error.description'));
          router.replace('/verify-email');
        }
      } catch (err) {
        setStatus('error');
        setError(t('error.description'));
        router.replace('/verify-email');
      }
    };

    verify();

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [searchParams, router, t]);

  if (status === 'verifying') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('verifying.title')}</CardTitle>
            <CardDescription>
              {t('verifying.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Loading />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('success.title')}</CardTitle>
            <CardDescription>
              {t('success.description', { countdown })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/login')} 
              className="w-full"
            >
              {t('success.button')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('error.title')}</CardTitle>
          <CardDescription>
            {error || t('error.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('error.message')}
          </p>
          <Button 
            onClick={() => router.push('/register')} 
            className="w-full"
          >
            {t('error.button')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  const t = useTranslations('auth.verifyEmail');

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>
              Please wait...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Loading />
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
