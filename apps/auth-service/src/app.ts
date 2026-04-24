import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { CORS_ORIGINS } from './config/env';
import * as Sentry from '@sentry/node';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  Sentry.captureException(err);
  res.status(500).send('Internal error');
});

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
