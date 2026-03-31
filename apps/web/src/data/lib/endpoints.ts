/*
 * This file defines constants for API endpoints used in the application.
 */

export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const RECIPE_API_URL =
  process.env.NEXT_PUBLIC_RECIPE_SERVICE_URL ?? 'http://localhost:5001/api/recipes';
export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? 'http://localhost:4000/api/auth';
