/**
 * @swagger
 * tags:
 *  name: User
 *  description: User CRUD
 * /api/v1/user:
 *   get:
 *     tags: [User]
 *     summary: Gets all users
 *     responses:
 *       200:
 *        description: Returns List of All Users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                         type: string
 *                         description: The User ID
 *                         example: 6557f2d5820a41d32c5827fa
 *                      firstName:
 *                         type: string
 *                         description: First name
 *                         example: James
 *                      lastName:
 *                         type: string
 *                         description: Last Name
 *                         example: Kirk
 *                      email:
 *                         type: string
 *                         description: Email Address
 *                         example: jamestkirk@starfleet.com
 *       404:
 *        description: No users found
 *   post:
 *     tags: [User]
 *     summary: Creates new user
 *     responses:
 *       201:
 *        description: User Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                newUser:
 *                  type: object
 *                  properties:
 *                    _id:
 *                       type: string
 *                       description: The User ID
 *                       example: 6557f2d5820a41d32c5827fa
 *                    firstName:
 *                       type: string
 *                       description: First name
 *                       example: James
 *                    lastName:
 *                       type: string
 *                       description: Last Name
 *                       example: Kirk
 *                    email:
 *                       type: string
 *                       description: Email Address
 *                       example: jamestkirk@starfleet.com
 *
 * /api/v1/user/:id:
 *   get:
 *     tags: [User]
 *     summary: Gets user details
 *     responses:
 *       200:
 *        description: User details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    firstName:
 *                       type: string
 *                       description: First name
 *                       example: James
 *                    lastName:
 *                       type: string
 *                       description: Last Name
 *                       example: Kirk
 *                    email:
 *                       type: string
 *                       description: Email Address
 *                       example: jamestkirk@starfleet.com
 *   put:
 *     tags: [User]
 *     summary: Updates a user
 *     responses:
 *       200:
 *        descriptions: Successfully updated user
 *   delete:
 *     tags: [User]
 *     summary: Deletes a user
 *     responses:
 *       200:
 *        description: Successfully deleted user
 */

import express from 'express';
import createUserHandler, {
  allUsersHandler,
  readUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/user';

const router = express.Router();

router.route('/').get(allUsersHandler).post(createUserHandler);
router.route('/:id').get(readUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export default router;
