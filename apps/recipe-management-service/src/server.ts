import app from './app';
import { connectDB } from './config/db';
import { seedRecipes } from './seeds/seed';
import { RECIPE_MANAGEMENT_SERVICE_PORT } from './config/env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api/recipes/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = RECIPE_MANAGEMENT_SERVICE_PORT;

const startServer = async () => {
  await connectDB();
  await seedRecipes();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
