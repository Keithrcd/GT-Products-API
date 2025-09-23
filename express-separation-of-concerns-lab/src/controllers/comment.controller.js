import * as commentService from '../services/comment.service.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Error fetching all comments'));
  }
};

export const getCommentsByPostId = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    if (isNaN(postId)) {
      throw new ApiError(400, 'Invalid postId');
    }

    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Error fetching comments for this post'));
  }
};

export const createComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { text, authorId } = req.body;

    if (isNaN(postId)) {
      throw new ApiError(400, 'Invalid postId');
    }
    if (!text) {
      throw new ApiError(400, 'Comment text is required');
    }
    if (!authorId) {
      throw new ApiError(400, 'authorId is required');
    }

    const newComment = await commentService.createComment(postId, { text, authorId });
    res.status(201).json(newComment);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Error creating comment'));
  }
};
