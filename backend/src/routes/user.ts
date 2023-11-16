import express from 'express';
import createUserHandler from '../controllers/user';

const router = express.Router();

router.route('/').post(createUserHandler);

export default router;
