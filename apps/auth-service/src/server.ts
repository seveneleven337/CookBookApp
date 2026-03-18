import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.dev' });

import app from './app';
import { connectDB } from './config/db';

const PORT = 4000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
