import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.dev' });

import app from './app';
import { connectDB } from './config/db';
import { seedUsers } from './seeds/seed';

const PORT = 4000;

const startServer = async () => {
  await connectDB();
  await seedUsers();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
