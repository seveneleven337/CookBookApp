export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
};

export type Recipe = {
  id: string;
  user_id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};
