import { Router } from 'express';
import {
  listRecipes,
  listRecipesByCategoryHandler,
  getRecipe,
  addRecipe,
  removeRecipeByMealId,
} from '../controllers/recipeController';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all recipes for the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recipes
 *       401:
 *         description: Unauthorized
 */
router.get('/', listRecipes);

/**
 * @swagger
 * /category/{category}:
 *   get:
 *     summary: List recipes by category for the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe category
 *     responses:
 *       200:
 *         description: List of recipes in the category
 *       401:
 *         description: Unauthorized
 */
router.get('/category/:category', listRecipesByCategoryHandler);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a recipe by UUID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe UUID
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getRecipe);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mealId
 *               - category
 *             properties:
 *               mealId:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created
 *       400:
 *         description: mealId and category are required
 *       401:
 *         description: Unauthorized
 */
router.post('/', addRecipe);

/**
 * @swagger
 * /meal/{mealId}:
 *   delete:
 *     summary: Delete a recipe by mealId
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mealId
 *         required: true
 *         schema:
 *           type: string
 *         description: The meal ID of the recipe to delete
 *     responses:
 *       204:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/meal/:mealId', removeRecipeByMealId);

export default router;
