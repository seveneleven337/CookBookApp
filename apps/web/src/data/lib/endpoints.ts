/*
 * This file defines constants for API endpoints used in the application.
 */

export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const RECIPE_API_URL = process.env.RECIPE_API_URL ?? 'https://cookbook.fi/api/recipes';
export const AUTH_API_URL = process.env.AUTH_API_URL ?? 'https://cookbook.fi/api/auth';
