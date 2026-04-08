'use client';

import { Meal } from '@/types/recipe-service-type';
import Image from 'next/image';

export default function MealCard({ meal }: { meal: Meal }) {
  function handleSave(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative flex-1 max-w-80 aspect-auto rounded-3xl overflow-hidden  bg-white">
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
          <span className="bg-card-tag-bg backdrop-blur text-gray-700 text-xs font-semibold px-3 py-1 rounded flex-1">
            {meal.strArea}
          </span>
        </div>
        <div className="w-full text-sm text-gray-500  overflow-hidden line-clamp-4">
          {meal.strInstructions}
        </div>
      </div>

      <div className="flex justify-center gap-6 px-6 pb-6">
        {/* <button
          onClick={fetchNewMeal}
          disabled={loading}
          className="w-14 h-14 rounded-full bg-red-100 text-red-500 text-2xl flex items-center justify-center shadow hover:bg-red-200 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? '...' : '✕'} 
        </button>*/}
        <button
          onClick={handleSave}
          className="w-14 h-14 rounded-full bg-green-100 text-green-500 text-2xl flex items-center justify-center shadow hover:bg-green-200 transition cursor-pointer"
        ></button>
      </div>
    </div>
  );
}
