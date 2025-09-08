// index.js
import express from 'express';
import postRoutes from './src/routes/post.routes.js';
// *** IMPORT THE NEW COMMENT ROUTES ***
import commentRoutes from './src/routes/comment.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the post routes
app.use('/posts', postRoutes);

// *** MOUNT THE NEW COMMENT ROUTES ***
app.use('/comments', commentRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});