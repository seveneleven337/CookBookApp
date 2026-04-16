import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { CORS_ORIGINS } from './config/env';

const app = express();

// Middlewares
app.use(
  cors({
    origin: CORS_ORIGINS,
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Auth Service is running'));

export default app;
