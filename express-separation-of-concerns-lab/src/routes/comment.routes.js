import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();
router.get('/', commentController.getAllComments);
router.get('/post/:postId', commentController.getCommentsByPostId);
router.post('/post/:postId', commentController.createCommentForPost);

export default router;
