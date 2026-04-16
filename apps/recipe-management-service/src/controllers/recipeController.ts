import { Response } from 'express';
import {
  listRecipesForUser,
  getRecipeById,
  createRecipe,
  deleteRecipeById,
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

const paramId = (id: string | string[] | undefined) =>
  Array.isArray(id) ? id[0] : id;

export const getRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = paramId(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
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
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ error: 'title is required' });
      return;
    }
    const row = await createRecipe({
      userId,
      title,
      description: description ?? null,
    });
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
};

export const removeRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = paramId(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    const ok = await deleteRecipeById(id);
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
