import express from 'express';
import healthRouter from './health';
import userRouter from './user';

const router = express.Router();

// Auth

// Health
router.use('/health', healthRouter);

// Users
router.use('/user', userRouter);

// Recipes

export default router;
