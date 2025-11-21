import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUserById);

/**
 * @openapi
 * /users/{userId}/posts:
 *   get:
 *     summary: Get all posts created by a specific user
 *     tags:
 *       - Users
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose posts you want to retrieve
 *     responses:
 *       200:
 *         description: List of posts created by the user
 *       404:
 *         description: User not found
 */
router.get('/:userId/posts', userController.getPostsByUser);

export default router;
