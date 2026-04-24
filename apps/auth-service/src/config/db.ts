import * as Sentry from '@sentry/node';
import { Sequelize } from 'sequelize';
import { AUTH_DB_NAME, AUTH_DB_USER, AUTH_DB_PASSWORD, DB_HOST, DB_PORT } from './env';
const sequelize = new Sequelize(AUTH_DB_NAME, AUTH_DB_USER, AUTH_DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

/**
 * Connect to the database and synchronize models. In development, it drops and recreates tables on each start.
 * In production, it should be configured to not drop tables and handle migrations properly.
 * development sync({ force: true })
 * production  sync({ alter: true })
 */
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ alter: true });
    await sequelize.sync({ force: true });
    console.log('Tables synchronized');
    console.log('Database connected successfully');
  } catch (error) {
    Sentry.captureException(error);
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
