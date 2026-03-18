export const PORT = process.env.AUTH_SERVICE_PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const AUTH_DB_NAME = process.env.AUTH_DB_NAME!;
export const AUTH_DB_USER = process.env.AUTH_DB_USER!;
export const AUTH_DB_PASSWORD = process.env.AUTH_DB_PASSWORD!;
export const DB_HOST = process.env.MYSQL_HOST || 'localhost';
export const DB_PORT = Number(process.env.MYSQL_PORT) || 3306;
