import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const createUser = async (userData) => {
  const { username, email } = userData;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    
    const userId = result.insertId;
    return await getUserById(userId);
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ApiError(409, 'Username or email already exists');
    }
    throw error;
  }
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE id = ?', 
    [id]
  );
  
  if (!rows[0]) {
    throw new ApiError(404, 'User not found');
  }
  
  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

export const getPostsByAuthorId = async (userId) => {
  await getUserById(userId);
  
  const [posts] = await pool.query(
    'SELECT * FROM posts WHERE authorId = ?',
    [userId]
  );
  
  return posts;
};