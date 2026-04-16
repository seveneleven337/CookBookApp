'use client';
import { useUserStore } from '@/data/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const brandClass = 'text-xl font-bold text-brand';
const navItemsClass =
  'text-lg font-semibold text-nav-item hover:text-gray-900 transition-colors underline decoration-transparent hover:decoration-black decoration-offset-[2px] duration-200';

/*
 * TODO: - Implement button feature on NavBar elements ( Breakfast, Vegan, Dessert, Salad) to filter recipes by category
 * Improve logo * icon
 */

export default function NavBar() {
  const router = useRouter();

  const { user, clearUser } = useUserStore();

  const handleLogout = async () => {
    clearUser();
    toast.success('Logged out successfully!', { position: 'bottom-right' });
  };

  function breakfastHandler() {
    if (!user?.token) router.push('/redirect');
    else router.push('/category/breakfast');
  }

  function VeganHandler() {
    if (!user?.token) router.push('/redirect');
    else router.push('/category/vegan');
  }

  function DessertHandler() {
    if (!user?.token) router.push('/redirect');
    else router.push('/category/dessert');
  }

  function SaladHandler() {
    if (!user?.token) router.push('/redirect');
    else router.push('/category/salad');
  }

  return (
    <div className="w-screen  border-b-3 border-border-bg z-50 px-8 py-2 flex items-center justify-between ">
      <div className={brandClass}>COOKBOOK</div>
      <div className="flex items-center justify-baseline gap-4">
        <button className={navItemsClass} onClick={breakfastHandler}>
          Breakfast
        </button>
        <button className={navItemsClass} onClick={VeganHandler}>
          Vegan
        </button>
        <button className={navItemsClass} onClick={DessertHandler}>
          Dessert
        </button>
        <button className={navItemsClass} onClick={SaladHandler}>
          Salad
        </button>
      </div>
      <div className="flex items-center gap-4">
        {!user?.token ? (
          <>
            <Link href="/login" className="inline-block">
              <button className="rounded-full px-4 py-3 text-nav-item font-bold text-base border-2 border-transparent hover:border-nav-item duration-200">
                Login
              </button>
            </Link>

            <Link href="/register" className="inline-block">
              <button className="rounded-full bg-form-btn-bg px-4 py-3 text-white font-bold text-base hover:bg-form-btn-bg-hover">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold sm:inline text-nav-item pr-2">
              {'Hi, ' + user.name}
            </span>
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
