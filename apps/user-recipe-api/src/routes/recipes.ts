import { Router, type Request, type Response } from 'express';
import { pool } from '../db.js';

export const recipesRouter = Router();

const userRecipeTable = 'recipes';

// GET - list recipes for a user
recipesRouter.get('/', async (req: Request, res: Response) => {
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
  try {
    const { rows } = await pool.query(
      `SELECT id, user_id, title, description, created_at, updated_at FROM ${userRecipeTable} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userIdNum],
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
});

// GET - get one recipe by id
recipesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT id, user_id, title, description, created_at, updated_at FROM ${userRecipeTable} WHERE id = $1`,
      [id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to get recipe' });
  }
});

// POST - add a recipe
recipesRouter.post('/', async (req: Request, res: Response) => {
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
  try {
    const { rows } = await pool.query(
      `INSERT INTO ${userRecipeTable} (user_id, title, description) VALUES ($1, $2, $3) RETURNING id, user_id, title, description, created_at, updated_at`,
      [userIdNum, title, description ?? null],
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});

// DELETE - delete a recipe
recipesRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(`DELETE FROM ${userRecipeTable} WHERE id = $1`, [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});
