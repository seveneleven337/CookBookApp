'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timer = setTimeout(() => {
      router.push('/login');
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  const features = [
    { text: 'Access premium content instantly' },
    { text: 'Save your favorites and history' },
    { text: 'Join members-only features' },
  ];

  function CreateHandler(): void {
    router.push('/register');
  }

  function LoginHandler(): void {
    router.push('/login');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Lock icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {/*           <Lock className="h-8 w-8 text-primary" />
           */}{' '}
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-text-title sm:text-3xl">
            Sign in to continue
          </h1>
          <p className="text-sm text-text-subtitle">
            You&apos;ve discovered exclusive content. Please log in or create an account to continue
            reading.
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 text-left">
          {features.map(({ text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              {/*               <Icon className="h-5 w-5 shrink-0 text-primary" />
               */}{' '}
              <span className="text-sm font-medium text-text-title">{text}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            className="rounded-2xl w-full bg-form-btn-bg px-6 py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={LoginHandler}
          >
            Login
          </button>
          <button
            className="w-full border-primary/30 text-primary hover:bg-primary/5"
            onClick={CreateHandler}
          >
            Create Account
          </button>
        </div>

        <p className="text-xs text-text-subtitle">
          Taking you to login in <span className="font-semibold text-primary">{countdown}</span>{' '}
          seconds
        </p>
      </div>
    </div>
  );
}
