'use client';

import { useRouter } from 'next/navigation';

export default function LeftSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-200 h-screen p-6 flex flex-col justify-between rounded-r-3xl shadow-md">
      {/* Top: Profile Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 ml-2 mt-2">My profile</h2>

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

          <button className="bg-white py-3 px-4 rounded-2xl shadow hover:shadow-md transition cursor-pointer text-left font-medium">
            Log out
          </button>
        </nav>
      </div>
    </aside>
  );
}
