'use client';

import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();

  function goToLogin() {
    router.push('/login');
  }

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-1">Create account</h1>
      <p className="text-gray-500 mb-8">Join us to discover new meals!</p>

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
          Already have an account?{' '}
          <button
            type="button"
            className="text-orange-500 font-semibold hover:underline cursor-pointer"
            onClick={goToLogin}
          >
            Log in
          </button>
        </p>

        {/* Submit button (static) */}
        <button
          type="button"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-2xl hover:bg-orange-600 transition cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
