import express from 'express';
import createUserHandler, {
  readUsersHandler,
  readUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/users';

const router = express.Router();

router.route('/').get(readUsersHandler).post(createUserHandler);
router.route('/:id').get(readUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export default router;
