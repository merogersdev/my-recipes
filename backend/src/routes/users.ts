import express from 'express';
import createUserHandler, {
  readAllUsersHandler,
  readUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/users';

const router = express.Router();

router.route('/').get(readAllUsersHandler).post(createUserHandler);
router.route('/:id').get(readUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export default router;
