import app from './app';
import { connectDB } from './config/db';
import { seedRecipes } from './seeds/seed';
import { RECIPE_MANAGEMENT_SERVICE_PORT } from './config/env';

const PORT = RECIPE_MANAGEMENT_SERVICE_PORT;

const startServer = async () => {
  await connectDB();
  await seedRecipes();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
