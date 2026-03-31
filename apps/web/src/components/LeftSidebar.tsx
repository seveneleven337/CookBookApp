'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/data/store/authStore';

export default function LeftSidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="w-64 bg-gray-200 h-screen p-6 flex flex-col justify-between rounded-r-3xl shadow-md">
      {/* Top: Profile Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 ml-2 mt-2">My profile</h2>
        {user ? (
          <p className="text-gray-700 mb-6 ml-2 mt-2">
            <span className="block">Logged in as</span>
            <span className="font-semibold">
              {user.name} {user.lastName}
            </span>
          </p>
        ) : (
          <p className="text-gray-500 mb-6 ml-2">Not logged in</p>
        )}

        <nav className="flex flex-col gap-4">
          <button
            className="bg-white py-3 px-4 rounded-2xl shadow hover:shadow-md transition cursor-pointer text-left font-medium"
            onClick={() => router.push('/homepage/random')}
          >
            Random recipes
          </button>

          <button
            className="bg-white py-3 px-4 rounded-2xl shadow hover:shadow-md transition cursor-pointer text-left font-medium"
            onClick={() => router.push('/homepage/recipes')}
          >
            Saved recipes
          </button>

          <button
            className="bg-white py-3 px-4 rounded-2xl shadow hover:shadow-md transition cursor-pointer text-left font-medium"
            onClick={() => {
              logout();
              router.push('/login');
            }}
          >
            Log out
          </button>
        </nav>
      </div>
    </aside>
  );
}
