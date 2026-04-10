'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold mb-3">Sign in to continue</h1>

      <p className="text-gray-600 max-w-md">
        You’ve discovered exclusive content. Please log in or create an account to continue reading.
      </p>

      <div className="mt-4 text-gray-700 space-y-2">
        <p>Access premium content instantly</p>
        <p>Save your favorites and history</p>
        <p>Join members-only features</p>
      </div>

      <p className="mt-6 text-sm text-gray-400">Taking you to login in 3 seconds...</p>
    </div>
  );
}
