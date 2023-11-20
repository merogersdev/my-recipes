import express from 'express';
import loginHandler from '../controllers/auth';

const router = express.Router();

router.route('/').post(loginHandler);

export default router;
