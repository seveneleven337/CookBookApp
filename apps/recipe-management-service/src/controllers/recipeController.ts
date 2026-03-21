import { Request, Response } from 'express';
import {
  listRecipesForUser,
  getRecipeById,
  createRecipe,
  deleteRecipeById,
} from '../services/recipeService';

export const listRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id;
    if (userId === undefined || userId === '') {
      res.status(400).json({ error: 'user_id query is required' });
      return;
    }
    const userIdNum = Number(userId);
    if (Number.isNaN(userIdNum)) {
      res.status(400).json({ error: 'user_id must be a number' });
      return;
    }
    const rows = await listRecipesForUser(userIdNum);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
};

const paramId = (id: string | string[] | undefined) =>
  Array.isArray(id) ? id[0] : id;

export const getRecipe = async (req: Request, res: Response) => {
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

export const addRecipe = async (req: Request, res: Response) => {
  try {
    const { user_id: userId, title, description } = req.body;
    if (userId === undefined || !title) {
      res.status(400).json({ error: 'user_id and title are required' });
      return;
    }
    const userIdNum = Number(userId);
    if (Number.isNaN(userIdNum)) {
      res.status(400).json({ error: 'user_id must be a number' });
      return;
    }
    const row = await createRecipe({
      userId: userIdNum,
      title,
      description: description ?? null,
    });
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
};

export const removeRecipe = async (req: Request, res: Response) => {
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
