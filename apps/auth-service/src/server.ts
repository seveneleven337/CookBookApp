import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://c856bd872eb9830b2a640c8fafad45d3@sentry.cookbook.fi/1',
  integrations: [Sentry.httpIntegration(), Sentry.expressIntegration()],
  tracesSampleRate: 1.0,
  environment: process.env.SERVICE_NAME || 'auth-service',
});

Sentry.setTag('service', process.env.SERVICE_NAME || 'auth-service');

import app from './app';
import { connectDB } from './config/db';
import { seedUsers } from './seeds/seed';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = Number(process.env.AUTH_SERVICE_PORT) || 4000;

const startServer = async () => {
  await connectDB();
  await seedUsers();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
