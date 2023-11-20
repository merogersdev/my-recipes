import express from 'express';
import createUserHandler, {
  allUsersHandler,
  readUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/user';

const router = express.Router();

router.route('/').get(allUsersHandler).post(createUserHandler);
router.route('/:id').get(readUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export default router;
