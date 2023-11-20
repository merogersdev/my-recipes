import express from 'express';
import healthRouter from './health';
import userRouter from './user';
import authRouter from './auth';
import docRouter from './docs';

const router = express.Router();

// Auth
router.use('/auth', authRouter);

// Health
router.use('/health', healthRouter);

// Users
router.use('/user', userRouter);

// Recipes

// Docs
router.use('/docs', docRouter);

export default router;
