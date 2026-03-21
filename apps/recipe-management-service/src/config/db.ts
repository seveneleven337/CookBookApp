import { Sequelize } from 'sequelize';
import {
  RECIPE_DB_NAME,
  RECIPE_DB_USER,
  RECIPE_DB_PASSWORD,
  RECIPE_DB_HOST,
  RECIPE_DB_PORT,
} from './env';

const sequelize = new Sequelize(RECIPE_DB_NAME, RECIPE_DB_USER, RECIPE_DB_PASSWORD, {
  host: RECIPE_DB_HOST,
  port: RECIPE_DB_PORT,
  dialect: 'postgres',
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
    await sequelize.sync({ force: true });
    console.log('Tables synchronized');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
