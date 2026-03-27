'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  function goToRegister() {
    router.push('/register');
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Please enter email and password');
      return;
    }

    try {
      await login({ email, password });
      router.push('/homepage');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-1">Log in</h1>
      <p className="text-gray-500 mb-8">Sign in to continue!</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div>
          <fieldset className="border border-gray-200 rounded-2xl px-4 pt-1 pb-3 focus-within:border-orange-400 transition">
            <legend className="text-xs font-semibold text-gray-400 px-1">Email</legend>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="border border-gray-200 rounded-2xl px-4 pt-1 pb-3 focus-within:border-orange-400 transition">
            <legend className="text-xs font-semibold text-gray-400 px-1">Password</legend>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*******"
              className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
            />
          </fieldset>
        </div>

        {formError && <p className="text-sm text-red-500 font-medium">{formError}</p>}
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-orange-500 font-semibold hover:underline cursor-pointer"
            onClick={goToRegister}
          >
            Register
          </button>
        </p>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-2xl hover:bg-orange-600 transition cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
