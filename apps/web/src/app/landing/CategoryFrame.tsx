import CategoryCard from '@/components/CategoryCard';
import { useUserStore } from '@/data/store/authStore';
import { useRouter } from 'next/navigation';

export default function CategoryFrame() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

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
    <div className="flex flex-col w-full h-fit items-center justify-center bg-category-card-bg p-12 gap-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="text-2xl text-primary font-semibold">Explore Categories</div>
        <div className="flex flex-row gap-4  justify-center">
          <button onClick={breakfastHandler}>
            <CategoryCard title="Breakfast" img="/breakfast.webp" height={200} width={300} />
          </button>
          <button onClick={VeganHandler}>
            <CategoryCard title="Vegan" img="/Vegan.webp" height={200} width={300} />
          </button>
          <button onClick={DessertHandler}>
            <CategoryCard title="Dessert" img="/Dessert.webp" height={200} width={300} />
          </button>
          <button onClick={SaladHandler}>
            <CategoryCard title="Salad" img="/QuickMeal.webp" height={200} width={300} />
          </button>
        </div>
      </div>
    </div>
  );
}
