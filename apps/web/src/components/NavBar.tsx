'use client';

import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/data/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const brandClass = 'text-xl font-bold text-brand';

const navItemsClass =
  'text-lg font-semibold text-nav-item hover:text-gray-900 transition-colors underline decoration-transparent hover:decoration-black decoration-offset-[2px] duration-200';

const dropdownItemClass =
  'px-3 py-2 rounded-lg text-sm text-nav-item font-medium hover:bg-[#91e790] cursor-pointer transition';

export default function NavBar() {
  const router = useRouter();
  const { user, clearUser } = useUserStore();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    clearUser();
    toast.success('Logged out successfully!', { position: 'bottom-right' });
  };

  function goToCategory(path: string) {
    if (!user?.token) router.push('/redirect');
    else router.push(`/category/${path}`);
    setOpen(false);
  }

  // 🔥 close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-screen border-b-3 border-border-bg z-50 px-8 py-2 flex items-center justify-between">
      {/* BRAND */}
      <div className={brandClass}>COOKBOOK</div>

      {/* NAV */}
      <div className="flex items-center gap-6">
        {/* HOME */}
        <button onClick={() => router.push('/')} className={navItemsClass}>
          Home
        </button>

        {/* DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            onMouseEnter={() => setOpen(true)} // hover UX
            className={navItemsClass}
          >
            Categories ▾
          </button>

          {/* dropdown */}
          <div
            className={`
              absolute left-0 mt-2 w-44 bg-[#f6f6e5]  rounded-xl shadow-lg p-2
              transition-all duration-200 origin-top
              ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
            onMouseLeave={() => setOpen(false)} // hover UX
          >
            <div onClick={() => goToCategory('breakfast')} className={dropdownItemClass}>
              Breakfast
            </div>
            <div onClick={() => goToCategory('vegan')} className={dropdownItemClass}>
              Vegan
            </div>
            <div onClick={() => goToCategory('dessert')} className={dropdownItemClass}>
              Dessert
            </div>
            <div onClick={() => goToCategory('salad')} className={dropdownItemClass}>
              Salad
            </div>
          </div>
        </div>

        {/* MY RECIPES */}
        <button
          onClick={() => {
            if (!user?.token) router.push('/redirect');
            else router.push('/my-recipes');
          }}
          className={navItemsClass}
        >
          My Recipes
        </button>
      </div>

      {/* AUTH */}
      <div className="flex items-center gap-4">
        {!user?.token ? (
          <>
            <Link href="/login">
              <button className="rounded-full px-4 py-3 text-nav-item font-bold text-base border-2 border-transparent hover:border-nav-item duration-200">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="rounded-full bg-form-btn-bg px-4 py-3 text-white font-bold text-base hover:bg-form-btn-bg-hover">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-nav-item pr-2">{'Hi, ' + user.name}</span>

            <button
              onClick={handleLogout}
              className="rounded-full bg-form-btn-bg px-4 py-3 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
