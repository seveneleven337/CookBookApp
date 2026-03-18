import express from 'express';
import cors from 'cors';
import { recipesRouter } from './routes/recipes.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use('/recipes', recipesRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`user-recipe-api listening on port ${port}`);
});
