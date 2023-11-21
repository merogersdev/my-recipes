import express from 'express';
import healthRouter from './health';
import userRouter from './users';
import authRouter from './auth';
import docRouter from './docs';

const router = express.Router();

// Auth
router.use('/auth', authRouter);

// Health
router.use('/health', healthRouter);

// Users
router.use('/users', userRouter);

// Recipes

// API Docs
router.use('/api-docs', docRouter);

export default router;
