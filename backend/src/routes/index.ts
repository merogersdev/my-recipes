import express from 'express';
import healthRouter from './health';
import userRouter from './user';
import authRouter from './auth';

const router = express.Router();

// Auth
router.use('/auth', authRouter);

// Health
router.use('/health', healthRouter);

// Users
router.use('/user', userRouter);

// Recipes

export default router;
