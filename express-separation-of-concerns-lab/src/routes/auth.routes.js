import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/auth.controller.js';
import { validateRegistration } from '../middlewares/validator.middleware.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    status: "error",
    message: "Too many login/register attempts. Try again later."
  }
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or bad input
 *       409:
 *         description: User already exists
 */
router.post(
  '/register',
  authLimiter,
  validateRegistration,
  authController.registerUser
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  authLimiter,
  authController.loginUser
);

export default router;
