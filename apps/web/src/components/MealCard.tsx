'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Meal } from '@/lib/recipe-api';

export default function MealCard({ initialMeal }: { initialMeal: Meal }) {
  const [meal, setMeal] = useState<Meal>(initialMeal);
  const [loading, setLoading] = useState(false);

  async function fetchNewMeal() {
    setLoading(true);
    const res = await fetch('/api/meals/random');
    const newMeal = await res.json();
    setMeal(newMeal);
    setLoading(false);
  }

  return (
    <div className="relative w-96 rounded-3xl overflow-hidden shadow-2xl bg-white">
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={400}
        height={400}
        className="w-full h-72 object-cover"
        loading="eager"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-t from-black/60 to-transparent" />

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

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{meal.strMeal}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Category:</span>
            {meal.strCategory}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Origin:</span>
            {meal.strArea}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 px-6 pb-6">
        <button
          onClick={fetchNewMeal}
          disabled={loading}
          className="w-14 h-14 rounded-full bg-red-100 text-red-500 text-2xl flex items-center justify-center shadow hover:bg-red-200 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? '...' : '✕'}
        </button>
        <button className="w-14 h-14 rounded-full bg-green-100 text-green-500 text-2xl flex items-center justify-center shadow hover:bg-green-200 transition cursor-pointer">
          ♥
        </button>
      </div>
    </div>
  );
}
