import { Request, Response } from 'express';
import { authenticateUser, createUser } from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;
    const user = await createUser({ name, lastName, email, password });
    res.status(201).json(user);
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser({ email, password });
    res.json({ token });
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    res.status(400).json({ error: error.message });
  }
};
