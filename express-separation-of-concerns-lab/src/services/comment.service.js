import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { getPostById } from './post.service.js';

const getUserById = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
  } catch (error) {
    throw new ApiError(500, 'Error checking author ID');
  }
};

export const getAllComments = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM comments');
    return rows;
  } catch (error) {
    throw new ApiError(500, 'Error fetching all comments');
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return rows;
  } catch (error) {
    throw new ApiError(500, 'Error fetching comments for this post');
  }
};

export const createComment = async (postId, commentData) => {
  try {
    const post = await getPostById(postId);
    if (!post) {
      throw new ApiError(404, `Post with ID ${postId} not found`);
    }

    const user = await getUserById(commentData.authorId);
    if (!user) {
      throw new ApiError(400, `Invalid authorId: ${commentData.authorId}`);
    }

    const [result] = await pool.query(
      'INSERT INTO comments (postId, text, authorId) VALUES (?, ?, ?)',
      [postId, commentData.text, commentData.authorId]
    );

    return { id: result.insertId, postId, ...commentData };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error creating comment');
  }
};
