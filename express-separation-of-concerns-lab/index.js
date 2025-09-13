import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './src/routes/post.routes.js'; 
import { testConnection } from './src/config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await testConnection();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('💥 Server not started. Fix the DB connection and try again.');
        process.exit(1);
    }
};

startServer();
