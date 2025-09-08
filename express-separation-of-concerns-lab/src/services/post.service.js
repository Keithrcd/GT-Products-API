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

export const updatePost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    posts[postIndex] = { ...posts[postIndex], title: postData.title, content: postData.content };
    return posts[postIndex];
};

export const partiallyUpdatePost = (id, updates) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null; 
    }
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