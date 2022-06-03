export const getPostById = async (posts, id) => {
    try {
        const findPostById = await posts.filter((post) => post.id === id);
        return findPostById;
    } catch (error) {
        throw error;
    }
};
export const getPostByUserId = async (posts, userId) => {
    try {
        const findPostByUserId = await posts.filter((post) => post.userId === Number(userId));

        return findPostByUserId;
    } catch (error) {
        throw error;
    }
};
export const postPost = async (posts, post) => {
    try {
        const newPost = { ...post, id: posts.length };
        return [...posts, newPost];
    } catch (error) {
        throw error;
    }
};
export const deletePostById = async (posts, id) => {
    const delPosts = await posts.filter((post) => post.id !== id);
    return [...delPosts];
};
export const getPostByOther = async (posts, userId) => {
    try {
        const findPostByUserId = await posts.filter((post) => post.userId !== userId);
        return findPostByUserId;
    } catch (error) {
        throw error;
    }
};
