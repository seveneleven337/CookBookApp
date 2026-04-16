import { Router } from 'express';
import {
  listRecipes,
  getRecipe,
  addRecipe,
  removeRecipe,
} from '../controllers/recipeController';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/', listRecipes);
router.get('/:id', getRecipe);
router.post('/', addRecipe);
router.delete('/:id', removeRecipe);

export default router;
