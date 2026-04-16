import { RecipeByCategory } from '@/types/recipe-service-type';

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
