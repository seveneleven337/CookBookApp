'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/data/react-query/useAuth';
import { toast } from 'sonner';
import * as Sentry from '@sentry/nextjs';

const fieldClass =
  'border border-gray-200 rounded-2xl px-4 pt-1 pb-3 bg-input-bg focus-within:border-primary transition';
const legendClass = 'text-xs font-semibold text-input-text-legend px-1';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { register, isRegistered, error } = useAuth();

  function goToLogin() {
    router.push('/login');
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!name || !lastName || !email || !password) {
      setFormError('Please fill in all fields.');
      Sentry.captureMessage('Registration form submission error: Missing required fields');
      toast.error('Please fill in all fields.', { position: 'bottom-right' });
      return;
    }

    register({ name, lastName, email, password });
  };

  useEffect(() => {
    if (error) {
      Sentry.captureMessage(
        'Registration form submission error: An error occurred during registration',
      );
      toast.error('An error occurred during registration. Please try again.', {
        position: 'bottom-right',
      });
    }
  }, [error]);

  useEffect(() => {
    if (isRegistered && router) {
      toast.success('Account created successfully! Please log in.', { position: 'bottom-right' });
      router.push('/login');
    }
  }, [isRegistered, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-sm bg-white px-10 py-12 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-form-text-title mb-1">Create Account</h1>
        <p className="text-form-text-subtitle mb-6">
          Start your journey with us and discover new meals every day!
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <fieldset className={fieldClass}>
              <legend className={legendClass}>First name</legend>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="First name"
                className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className={fieldClass}>
              <legend className={legendClass}>Last name</legend>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
                className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className={fieldClass}>
              <legend className={legendClass}>Email</legend>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
                autoComplete="email"
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
                className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
                minLength={6}
                autoComplete="new-password"
              />
            </fieldset>
          </div>

          {formError && <p className="text-sm text-red-500 font-medium">{formError}</p>}

          <p className="text-sm text-gray-400">
            Already a member?{' '}
            <button
              type="button"
              className="text-input-text-legend font-semibold hover:underline cursor-pointer hover:text-input-text-legend-hover transition pl-0.5"
              onClick={goToLogin}
            >
              Sign in
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-form-btn-bg text-white font-bold text-base py-3 rounded-full hover:bg-form-btn-bg-hover transition cursor-pointer"
          >
            {'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
