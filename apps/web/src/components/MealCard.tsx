'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Tag from './Tag';
import { useUserStore } from '@/data/store/authStore';
import { toast } from 'sonner';
import { useDeleteRecipe, useSaveRecipe } from '@/data/react-query/useRecipeService';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Meal } from '@/types/recipe-service-type';

type MealCardProps = {
  meal: Meal;
  variant?: 'default' | 'myRecipe';
};

export default function MealCard({ meal, variant }: MealCardProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const {
    mutate: save,
    isSuccess: isSaveSuccess,
    isError: isSaveError,
  } = useSaveRecipe(user?.token ?? null);

  const {
    mutate: deleteRecipe,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteRecipe(user?.token ?? null);

  function saveHandler(mealId: string, category: string): void {
    if (mealId && user?.token) {
      save({ mealId, category });
    }
  }

  function seeMoreHandler(mealId: string): void {
    if (mealId && user?.token) {
      router.push(`/recipe/${mealId}`);
    }
  }

  function removeRecipe(mealId: string): void {
    if (mealId && user?.token) {
      deleteRecipe(mealId);
    }
  }

  useEffect(() => {
    if (isSaveSuccess) {
      toast.success('Recipe saved to your profile!', {
        description: 'You can find it in your saved recipes.',
      });
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (isSaveError) {
      toast.error('Failed to save recipe.', {
        description: 'Please try again later.',
      });
    }
  }, [isSaveError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Recipe deleted from your profile!', {
        description: 'The recipe has been removed from your saved recipes.',
      });
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error('Failed to delete recipe.', {
        description: 'Please try again later.',
      });
    }
  }, [isDeleteError]);

  return (
    <div className="relative w-full max-w-100 min-w-0 rounded-3xl overflow-hidden bg-white">
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
            variant === 'myRecipe' ? 'h-72' : 'h-48'
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
        {variant === 'myRecipe' ? (
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

      {variant === 'myRecipe' ? (
        <div className="flex justify-end px-3 pb-6 gap-3">
          <button
            className="w-full rounded-2xl bg-form-btn-bg px-6 py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={() => seeMoreHandler(meal.idMeal)}
          >
            See more
          </button>
          <button
            onClick={() => removeRecipe(meal.idMeal, meal.strMeal)}
            className="bg-btn-bg-secondary px-3 py-2 rounded-2xl shadow-md transition hover:bg-btn-bg-secondary-hover flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4 text-red-500 hover:text-green-500 transition" />
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-2 px-6 pb-6">
          <button
            className="flex-1 rounded-2xl bg-form-btn-bg py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={() => saveHandler(meal.idMeal, meal.strCategory)}
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
      )}
    </div>
  );
}
