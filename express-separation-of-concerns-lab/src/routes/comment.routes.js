import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: A list of all comments
 */
router.get('/', commentController.getAllComments);

/**
 * @openapi
 * /comments/post/{postId}:
 *   get:
 *     summary: Get comments for a specific post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Comments for the given post
 *       404:
 *         description: Post not found
 */

router.get('/:postId/comments', commentController.getCommentsByPostId);

/**
 * @openapi
 * /comments/post/{postId}:
 *   post:
 *     summary: Create a comment for a specific post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 */
router.post('/post/:postId', commentController.createCommentForPost);

export default router;
