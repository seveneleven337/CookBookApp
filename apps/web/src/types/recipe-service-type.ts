export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
};

export type Recipe = {
  id: string;
  user_id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type RecipeByCategory = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type GetRecipeFromServiceType = {
  id: string;
  user_id: number;
  meal_id: string;
  category: string;
  created_at: string;
  updated_at: string;
};
