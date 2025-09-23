import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(
      new ApiResponse(201, newUser, 'User created successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(
      new ApiResponse(200, user, 'User retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(
      new ApiResponse(200, users, 'Users retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getPostsByUser = async (req, res, next) => {
  try {
    const posts = await userService.getPostsByAuthorId(req.params.userId);
    res.status(200).json(
      new ApiResponse(200, posts, 'Posts retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};