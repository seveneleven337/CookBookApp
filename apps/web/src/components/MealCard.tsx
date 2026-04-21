'use client';

import { Meal } from '@/types/recipe-service-type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Tag from './Tag';

type MealCardProps = {
  meal: Meal;
  variant?: 'default' | 'recommended';
};

export default function MealCard({ meal, variant }: MealCardProps) {
  const router = useRouter();

  function saveHandler(mealId: string): void {
    if (mealId) {
      router.push(`/recipe/${mealId}`);
    }
  }

  function seeMoreHandler(mealId: string): void {
    if (mealId) {
      router.push(`/recipe/${mealId}`);
    }
  }

  return (
    <div className="relative w-full max-w-80 min-w-0 rounded-3xl overflow-hidden bg-white">
      <div className="relative">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={400}
          height={400}
          className={`w-full object-cover h-72`}
          loading="eager"
        />

        <div
          className={`absolute top-0 left-0 w-full ${
            variant === 'recommended' ? 'h-72' : 'h-48'
          } bg-linear-to-t from-black/0 to-transparent`}
        />

        <div className="absolute top-4 left-4 flex gap-2 flex-wrap pr-2">
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
      </div>

      <div className="m-4">
        {variant === 'recommended' ? (
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="text-xl font-bold text-[#024610] flex-1 overflow-hidden line-clamp-1">
              {meal.strMeal}
            </h2>

            {meal.strArea && <Tag text={meal.strArea} />}
          </div>
        ) : (
          <div className="mb-2">
            <h2 className="text-xl font-bold text-[#024610] overflow-hidden line-clamp-2">
              {meal.strMeal}
            </h2>

            {meal.strArea && (
              <div className="flex flex-row mt-1 justify-between">
                <Tag variant="tertiary" text={meal.strArea} />
                <Tag
                  variant="tertiary"
                  text={35 + (parseInt(meal.idMeal, 10) % 12) * 5 * 5 + ' min'}
                />
              </div>
            )}
          </div>
        )}
        <div className="w-full text-sm text-gray-500  overflow-hidden line-clamp-4">
          {meal.strInstructions}
        </div>
      </div>

      {variant === 'recommended' ? (
        <div className="w-full flex flex-row gap-2 px-6 pb-6">
          <button
            className="flex-1 rounded-2xl bg-form-btn-bg py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={() => saveHandler(meal.idMeal)}
          >
            Save recipe
          </button>

          <button
            className="flex-1 rounded-2xl bg-form-btn-bg py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={() => seeMoreHandler(meal.idMeal)}
          >
            See more
          </button>
        </div>
      ) : (
        <div className="flex justify-end px-3 pb-6">
          <button
            className="w-full rounded-2xl bg-form-btn-bg px-6 py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={() => saveHandler(meal.idMeal)}
          >
            Save recipe
          </button>
        </div>
      )}
    </div>
  );
}
