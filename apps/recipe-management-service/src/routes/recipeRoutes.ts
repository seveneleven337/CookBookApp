import { Router } from 'express';
import {
  listRecipes,
  getRecipe,
  addRecipe,
  removeRecipe,
} from '../controllers/recipeController';

const router = Router();

router.get('/', listRecipes);
router.get('/:id', getRecipe);
router.post('/', addRecipe);
router.delete('/:id', removeRecipe);

export default router;
