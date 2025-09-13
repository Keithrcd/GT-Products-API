import * as postService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const newPost = await postService.createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await postService.updatePost(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

export const partiallyUpdatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await postService.partiallyUpdatePost(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error partially updating post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await postService.deletePost(id);
        if (!success) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};