import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

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
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE postId = ?',
      [postId]
    );
    return rows;
  } catch (error) {
    throw new ApiError(500, 'Error fetching comments for this post');
  }
};

export const createComment = async (postId, commentData) => {
  const { authorId, text } = commentData;

  try {
    const [result] = await pool.query(
      'INSERT INTO comments (postId, text, authorId) VALUES (?, ?, ?)',
      [postId, text, authorId]
    );

    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE id = ?',
      [result.insertId]
    );

    return rows[0];
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
    }
    throw new ApiError(500, 'Error creating comment');
  }
};
