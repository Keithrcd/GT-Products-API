import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger.js';

import postRoutes from './src/routes/post.routes.js';
import userRoutes from './src/routes/user.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import photoRoutes from './src/routes/photo.routes.js';

import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
  origin: ["http://localhost:5173"], 
  credentials: true
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/photos', photoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📘 API Docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('💥 Server not started. Fix the DB connection and try again.');
    process.exit(1);
  }
};

startServer();
