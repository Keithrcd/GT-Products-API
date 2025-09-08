// src/services/comment.service.js

// In-memory "database" for comments
let comments = [
    { id: 1, text: 'Great first post!', postId: 1 },
    { id: 2, text: 'I agree, very insightful.', postId: 1 },
    { id: 3, text: 'This is a comment on the second post.', postId: 2 },
];
let nextId = 4;

// We need access to posts to ensure a post exists before adding a comment
import { getPostById } from './post.service.js';

export const getAllComments = () => {
    return comments;
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
};

export const createComment = (postId, commentData) => {
    // Check if the post actually exists before creating a comment for it
    const post = getPostById(postId);
    if (!post) {
        return null; // Or throw an error
    }
    const newComment = { id: nextId++, postId, ...commentData };
    comments.push(newComment);
    return newComment;
};