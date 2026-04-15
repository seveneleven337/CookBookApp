import { useQuery } from '@tanstack/react-query';
import { getMealListByCategory, getRandomMeal } from '../lib/recipe-api';
import { RecipeByCategory } from '@/types/recipe-service-type';

export function useRecipe() {
  return useQuery({
    queryKey: ['randomMeal'],
    queryFn: getRandomMeal,
  });
}

export function useRecipes() {
  return useQuery({
    queryKey: ['randomMeals'],
    queryFn: async () => {
      const meals = await Promise.all(Array.from({ length: 6 }, () => getRandomMeal()));
      return meals;
    },
    staleTime: Infinity,
  });
}

export function useRecipesByCategory(category: string) {
  return useQuery({
    queryKey: ['mealsByCategory', category],
    queryFn: async () => {
      const meals = await getMealListByCategory(category);
      return recipesByCategorySanitizer(meals, category);
    },
    staleTime: Infinity,
  });
}

function recipesByCategorySanitizer(meals: RecipeByCategory[], category: string) {
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
