import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllPosts = async () => {
  try {
    const [posts] = await pool.query(
      `SELECT 
          p.id,
          p.title,
          p.content,
          p.authorId,
          u.username AS authorUsername,
          u.email AS authorEmail
       FROM posts p
       JOIN users u ON p.authorId = u.id`
    );
    return posts;
  } catch (error) {
    throw new ApiError(500, 'Error fetching posts');
  }
};

export const getPostById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
          p.id,
          p.title,
          p.content,
          p.authorId,
          u.username AS authorUsername,
          u.email AS authorEmail
       FROM posts p
       JOIN users u ON p.authorId = u.id
       WHERE p.id = ?`,
      [id]
    );

    if (!rows[0]) {
      throw new ApiError(404, 'Post not found');
    }

    return rows[0];
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error fetching post by ID');
  }
};

export const createPost = async (postData) => {
  const { title, content, authorId } = postData;

  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
      [title, content, authorId]
    );
    const newPostId = result.insertId;
    return { id: newPostId, title, content, authorId };
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid author ID. User does not exist.');
    }
    throw new ApiError(500, 'Error creating post');
  }
};

export const updatePost = async (id, postData) => {
  const { title, content } = postData;

  try {
    const [result] = await pool.query(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Post not found');
    }

    return { id, title, content };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error updating post');
  }
};

export const partiallyUpdatePost = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return { id };
  }

  const setClause = fields.map((field) => `${field} = ?`).join(', ');

  try {
    const [result] = await pool.query(
      `UPDATE posts SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Post not found');
    }

    return { id, ...updates };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error partially updating post');
  }
};

export const deletePost = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Post not found');
    }
    return { message: 'Post deleted successfully' };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error deleting post');
  }
};
