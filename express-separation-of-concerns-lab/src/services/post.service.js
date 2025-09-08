// src/services/post.service.js

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
];
let nextId = 3;

export const getAllPosts = () => {
    return posts;
};

export const getPostById = (id) => {
    return posts.find(p => p.id === id);
};

export const createPost = (postData) => {
    const newPost = { id: nextId++, ...postData };
    posts.push(newPost);
    return newPost;
};

// This is the old update function for PUT
export const updatePost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    // For PUT, we can keep it as is, but for PATCH, we need to merge
    posts[postIndex] = { ...posts[postIndex], title: postData.title, content: postData.content };
    return posts[postIndex];
};

// *** NEW FUNCTION FOR PATCH ***
export const partiallyUpdatePost = (id, updates) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null; // Post not found
    }
    // Merge the existing post with the updates
    const updatedPost = { ...posts[postIndex], ...updates };
    posts[postIndex] = updatedPost;
    return updatedPost;
};

export const deletePost = (id) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return false;
    }
    posts.splice(postIndex, 1);
    return true;
};