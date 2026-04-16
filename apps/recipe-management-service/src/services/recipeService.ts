import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.dev' });

import Recipe from '../models/Recipe';

export interface RecipeRow {
  id: string;
  user_id: number;
  meal_id: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

const toRow = (r: Recipe): RecipeRow => ({
  id: r.id,
  user_id: r.userId,
  meal_id: r.mealId,
  category: r.category,
  created_at: r.createdAt,
  updated_at: r.updatedAt,
});

export const listRecipesForUser = async (userId: number): Promise<RecipeRow[]> => {
  const rows = await Recipe.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
  return rows.map(toRow);
};

export const getRecipeById = async (id: string): Promise<RecipeRow | null> => {
  const row = await Recipe.findByPk(id);
  return row ? toRow(row) : null;
};

export const createRecipe = async (input: {
  userId: number;
  mealId: string;
  category: string;
}): Promise<RecipeRow> => {
  const row = await Recipe.create({
    userId: input.userId,
    mealId: input.mealId,
    category: input.category,
  });
  return toRow(row);
};

export const deleteRecipeById = async (id: string): Promise<boolean> => {
  const n = await Recipe.destroy({ where: { id } });
  return n > 0;
};
