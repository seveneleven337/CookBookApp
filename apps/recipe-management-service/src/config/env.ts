export const RECIPE_MANAGEMENT_SERVICE_PORT = Number(
  process.env.RECIPE_MANAGEMENT_SERVICE_PORT,
) || 5000;
export const RECIPE_DB_NAME = process.env.RECIPE_DB_NAME!;
export const RECIPE_DB_USER = process.env.RECIPE_DB_USER!;
export const RECIPE_DB_PASSWORD = process.env.RECIPE_DB_PASSWORD!;
export const RECIPE_DB_HOST = process.env.RECIPE_DB_HOST || 'localhost';
export const RECIPE_DB_PORT = Number(process.env.RECIPE_DB_PORT) || 5432;
