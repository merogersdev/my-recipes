/**
 * @swagger
 * tags:
 *  name: Docs
 *  description: API Documentation
 * /api/v1/docs:
 *   get:
 *     tags: [Docs]
 *     responses:
 *       200:
 *         description: Returns Status 200
 */

import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from '../config/swagger';

const router = express.Router();

const specs = swaggerJsdoc(options);
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
