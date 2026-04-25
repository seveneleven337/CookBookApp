import { Meal, RecipeByCategory } from '@/types/recipe-service-type';

export function recipesByFilterSanitizer(meals: RecipeByCategory[], category: string) {
  if (!meals || !Array.isArray(meals)) {
    throw new Error('Invalid data format: expected an array of meals');
  }
  return meals.map((meal) => {
    if (
      typeof meal.idMeal !== 'string' ||
      typeof meal.strMeal !== 'string' ||
      typeof meal.strMealThumb !== 'string'
    ) {
      throw new Error('Invalid meal data format');
    }
    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strCategory: category,
      strArea: '',
      strInstructions: '',
      strMealThumb: meal.strMealThumb,
      strTags: '',
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mealSanitizer(meal: any): Meal {
  if (!meal || typeof meal !== 'object') {
    throw new Error('Invalid meal data');
  }

  const sanitizedMeal: Meal = {
    idMeal: typeof meal.idMeal === 'string' ? meal.idMeal : '',
    strMeal: typeof meal.strMeal === 'string' ? meal.strMeal : '',
    strCategory: typeof meal.strCategory === 'string' ? meal.strCategory : '',
    strArea: typeof meal.strArea === 'string' ? meal.strArea : '',
    strInstructions: typeof meal.strInstructions === 'string' ? meal.strInstructions : '',
    strMealThumb: typeof meal.strMealThumb === 'string' ? meal.strMealThumb : '',
    strTags: typeof meal.strTags === 'string' ? meal.strTags : '',
    strYoutube: typeof meal.strYoutube === 'string' ? meal.strYoutube : undefined,
  };

  for (let i = 1; i <= 20; i += 1) {
    const ingredientKey = `strIngredient${i}` as const;
    const measureKey = `strMeasure${i}` as const;

    sanitizedMeal[ingredientKey] =
      typeof meal[ingredientKey] === 'string' && meal[ingredientKey].trim()
        ? meal[ingredientKey]
        : undefined;
    sanitizedMeal[measureKey] =
      typeof meal[measureKey] === 'string' && meal[measureKey].trim()
        ? meal[measureKey]
        : undefined;
  }

  return sanitizedMeal;
}
