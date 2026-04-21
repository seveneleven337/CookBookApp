import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const publicPaths = ['/docs', '/openapi.json'];

  if (publicPaths.some((path) => req.path.startsWith(path))) {
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
