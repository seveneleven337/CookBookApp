import app from './app';
import { connectDB } from './config/db';
import { seedUsers } from './seeds/seed';

const PORT = Number(process.env.AUTH_SERVICE_PORT) || 4000;
const startServer = async () => {
  await connectDB();
  await seedUsers();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
