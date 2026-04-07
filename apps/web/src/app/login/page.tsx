'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/data/react-query/useAuth';
import { useUserStore } from '@/data/store/authStore';

const fieldClass =
  'border border-gray-200 rounded-2xl px-4 pt-1 pb-3 bg-input-bg focus-within:border-primary transition';
const legendClass = 'text-xs font-semibold text-input-text-legend px-1';

/*
 * TODO: - Add toast notifications for errors ( formError and errors) and success
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { login, error } = useAuth();
  const user = useUserStore((state) => state.user);

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

    login({ email, password });
  };

  useEffect(() => {
    if (error) {
      //Implement toast notification here
    }
  }, [error]);

  useEffect(() => {
    if (user && user.token && router) {
      router.push('/home');
    }
  }, [user, router]);

  return (
    <div className="w-full max-w-sm bg-white px-10 py-12 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-form-text-title mb-1">Welcome Back</h1>
      <p className="text-form-text-subtitle mb-6">
        Please enter your details to access your kitchen
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div>
          <fieldset className={fieldClass}>
            <legend className={legendClass}>Email</legend>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full outline-none text-input-text  bg-transparent text-md"
            />
          </fieldset>
        </div>

        <div>
          <fieldset className={fieldClass}>
            <legend className={legendClass}>Password</legend>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*******"
              className="w-full outline-none text-input-text bg-transparent text-sm"
            />
          </fieldset>
        </div>

        {formError && <p className="text-sm text-red-500 font-medium">{formError}</p>}

        <p className="text-sm text-gray-400">
          New to the table?{' '}
          <button
            type="button"
            className="text-input-text-legend font-semibold hover:underline cursor-pointer hover:text-input-text-legend-hover transition pl-0.5"
            onClick={goToRegister}
          >
            Register
          </button>
        </p>

        <button
          type="submit"
          className="w-full bg-form-btn-bg text-white font-bold text-base py-3 rounded-full hover:bg-form-btn-bg-hover transition cursor-pointer"
        >
          {'Sign in'}
        </button>
      </form>
    </div>
  );
}
