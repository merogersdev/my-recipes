/**
 * @swagger
 * tags:
 *  name: Health
 *  description: Health Check
 * /api/v1/health:
 *   get:
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns Status 200
 */

import express from 'express';
import healthCheck from '../controllers/health';

const router = express.Router();

router.route('/').get(healthCheck);

export default router;
