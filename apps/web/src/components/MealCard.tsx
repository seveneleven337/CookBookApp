'use client';

import { Meal } from '@/types/recipe-service-type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Tag from './Tag';

export default function MealCard({ meal }: { meal: Meal }) {
  const router = useRouter();

  function handleSave(mealId: string): void {
    if (mealId) {
      router.push(`/recipe/${mealId}`);
    }
  }

  return (
    <div className="relative w-full max-w-80 min-w-0 rounded-3xl overflow-hidden bg-white">
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={400}
        height={400}
        className="w-full h-72 object-cover"
        loading="eager"
      />
      <div className="absolute top-0 left-0 w-full h-72 bg-linear-to-t from-black/60 to-transparent" />

      <div className="absolute top-4 left-4 flex gap-2">
        {meal.strTags &&
          meal.strTags.split(',').map((tag) => (
            <span
              key={tag}
              className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
      </div>

      <div className="m-4">
        <div className="flex items-center gap-2 mb-4 h-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex-4 overflow-hidden line-clamp-3">
            {meal.strMeal}
          </h2>
          {meal.strArea && <Tag text={meal.strArea} />}
        </div>
        <div className="w-full text-sm text-gray-500  overflow-hidden line-clamp-4">
          {meal.strInstructions}
        </div>
      </div>

      <div className="flex justify-end gap-6 px-6 pb-6 pt-1">
        <button
          className="rounded-2xl bg-form-btn-bg px-6 py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
          onClick={() => handleSave(meal.idMeal)}
        >
          See more
        </button>
      </div>
    </div>
  );
}
