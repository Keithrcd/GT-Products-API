import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments();
  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentService.getCommentsByPostId(postId);
  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const newComment = await commentService.createComment(postId, req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment created successfully"));
});

