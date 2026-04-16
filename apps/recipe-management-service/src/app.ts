import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';
import { CORS_ORIGINS } from './config/env';

const app = express();

app.use(
  cors({
    origin: CORS_ORIGINS,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/recipes', recipeRoutes);

app.get('/', (_req, res) => res.send('Recipe Management Service is running'));

export default app;
