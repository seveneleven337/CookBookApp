import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.dev' });

import Recipe from '../models/Recipe';

export interface RecipeRow {
  id: string;
  user_id: number;
  title: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

const toRow = (r: Recipe): RecipeRow => ({
  id: r.id,
  user_id: r.userId,
  title: r.title,
  description: r.description,
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
  title: string;
  description?: string | null;
}): Promise<RecipeRow> => {
  const row = await Recipe.create({
    userId: input.userId,
    title: input.title,
    description: input.description ?? null,
  });
  return toRow(row);
};

export const deleteRecipeById = async (id: string): Promise<boolean> => {
  const n = await Recipe.destroy({ where: { id } });
  return n > 0;
};
