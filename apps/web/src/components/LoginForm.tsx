'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  function goToRegister() {
    router.push('/register');
  }

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-1">Log in</h1>
      <p className="text-gray-500 mb-8">Sign in to continue!</p>

      <form className="flex flex-col gap-4" noValidate>
        {/* Username */}
        <div>
          <fieldset className="border border-gray-200 rounded-2xl px-4 pt-1 pb-3 focus-within:border-orange-400 transition">
            <legend className="text-xs font-semibold text-gray-400 px-1">Username</legend>
            <input
              type="text"
              placeholder="username"
              className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
            />
          </fieldset>
        </div>

        {/* Password */}
        <div>
          <fieldset className="border border-gray-200 rounded-2xl px-4 pt-1 pb-3 focus-within:border-orange-400 transition">
            <legend className="text-xs font-semibold text-gray-400 px-1">Password</legend>
            <input
              type="password"
              placeholder="*******"
              className="w-full outline-none text-gray-800 placeholder-gray-300 bg-transparent text-sm"
            />
          </fieldset>
        </div>

        {/* Login switch (static) */}
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

        {/* Submit button (static) */}
        <button
          type="button"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-2xl hover:bg-orange-600 transition cursor-pointer"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
