import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get('/', postController.getAllPosts);

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, validatePost, postController.createPost);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post data
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Fully update a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put('/:id', authMiddleware, validatePost, postController.updatePost);

/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     summary: Partially update a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.patch('/:id', authMiddleware, postController.partiallyUpdatePost);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authMiddleware, postController.deletePost);

/**
 * @openapi
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of comments for the post
 *       404:
 *         description: Post not found
 */
router.get('/:postId/comments', commentController.getCommentsByPostId);

/**
 * @openapi
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to comment on
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
 *         description: Comment created
 *       400:
 *         description: Validation error
 *       404:
 *         description: Post not found
 */
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;
