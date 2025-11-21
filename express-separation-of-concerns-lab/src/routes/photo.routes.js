import { Router } from 'express';
import * as photoController from '../controllers/photo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /photos:
 *   get:
 *     summary: Get all photos for the authenticated user
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user photos
 *       401:
 *         description: Unauthorized
 */
router.get('/', photoController.getUserPhotos);

/**
 * @openapi
 * /photos/{id}:
 *   delete:
 *     summary: Delete a user's photo by ID
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Photo ID to delete
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Photo not found
 */
router.delete('/:id', photoController.deleteUserPhoto);

/**
 * @openapi
 * /photos/upload:
 *   post:
 *     summary: Upload a photo for the authenticated user
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file uploaded or invalid format
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;
