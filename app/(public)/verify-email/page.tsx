'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/lib/api';
import Loading from '@/components/Loading';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setError('Verification token is missing.');
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
          setError(data.message || 'This verification link is invalid or has expired.');
          router.replace('/verify-email');
        } else {
          setStatus('error');
          setError('An error occurred. Please try again.');
          router.replace('/verify-email');
        }
      } catch (err) {
        setStatus('error');
        setError('Network error. Please check your connection and try again.');
        router.replace('/verify-email');
      }
    };

    verify();

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [searchParams, router]);

  if (status === 'verifying') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying your email</CardTitle>
            <CardDescription>
              Please wait while we verify your email address...
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
            <CardTitle>Email verified successfully!</CardTitle>
            <CardDescription>
              Your email has been verified. Redirecting to login in {countdown} seconds...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/login')} 
              className="w-full"
            >
              Go to Login
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
          <CardTitle>Verification failed</CardTitle>
          <CardDescription>
            {error || 'Unable to verify your email address.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The verification link may have expired or already been used. Please request a new verification email.
          </p>
          <Button 
            onClick={() => router.push('/register')} 
            className="w-full"
          >
            Back to Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

