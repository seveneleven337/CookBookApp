import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://web.localhost'],
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
