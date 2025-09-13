import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; 
import postRoutes from './src/routes/post.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev')); 
app.use(express.json());

app.use('/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});