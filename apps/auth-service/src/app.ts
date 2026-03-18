import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

app.get('/', (req, res) => res.send('Auth Service is running'));

export default app;
