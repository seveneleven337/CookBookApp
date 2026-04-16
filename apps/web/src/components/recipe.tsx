import { Meal } from '@/types/recipe-service-type';
import React from 'react';

function getIngredients(meal: Meal) {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}

export default function Recipe({ meal }: { meal: Meal }) {
  const ingredients = getIngredients(meal);
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>

      {/* Image */}
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg mb-6" />

      {/* Meta */}
      <div className="flex gap-4 mb-6 text-sm text-gray-600">
        <span>🍗 {meal.strCategory}</span>
        <span>🌍 {meal.strArea}</span>
      </div>

      {/* Ingredients */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-1">
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line text-gray-700">{meal.strInstructions}</p>
      </section>

      {/* YouTube */}
      {meal.strYoutube && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Video</h2>
          <iframe
            className="w-full aspect-video rounded-lg"
            src={meal.strYoutube.replace('watch?v=', 'embed/')}
            title="Recipe video"
            allowFullScreen
          />
        </section>
      )}
    </div>
  );
}
