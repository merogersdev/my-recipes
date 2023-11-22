import express from 'express';
import createRecipeHandler, {
  readAllRecipesHandler,
  readRecipeHandler,
  updateRecipeHandler,
  deleteRecipeHandler,
} from '../controllers/recipes';

const router = express.Router();

router.route('/').get(readAllRecipesHandler).post(createRecipeHandler);
router.route('/:id').get(readRecipeHandler).patch(updateRecipeHandler).delete(deleteRecipeHandler);

export default router;
