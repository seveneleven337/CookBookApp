import { Response } from 'express';
import {
  listRecipesForUser,
  listRecipesByCategory,
  getRecipeById,
  createRecipe,
  deleteRecipeByMealId,
} from '../services/recipeService';
import { AuthenticatedRequest } from '../middleware/authenticate';

export const listRecipes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const rows = await listRecipesForUser(userId);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
};

export const listRecipesByCategoryHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const category = Array.isArray(req.params.category) ? req.params.category[0] : req.params.category;
    const rows = await listRecipesByCategory(userId, category);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get recipes by category' });
  }
};

export const getRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const row = await getRecipeById(id);
    if (!row) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get recipe' });
  }
};

export const addRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { mealId, category } = req.body;
    if (!mealId || !category) {
      res.status(400).json({ error: 'mealId and category are required' });
      return;
    }
    const row = await createRecipe({ userId, mealId, category });
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
};

export const removeRecipeByMealId = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const mealId = Array.isArray(req.params.mealId) ? req.params.mealId[0] : req.params.mealId;
    const ok = await deleteRecipeByMealId(mealId, userId);
    if (!ok) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};
