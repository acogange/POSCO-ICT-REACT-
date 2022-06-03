import { createAsyncThunk } from '@reduxjs/toolkit';
import { deletePostById, getPostByOther, getPostByUserId, postPost } from '../store/postsAPI';
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../data/Post';
const initialState = {
    posts: Post,
    myPosts: {
        posts: [],
        loading: false,
        message: '',
    },

    otherPosts: {
        posts: [],
        loading: false,
        message: '',
    },
    searchPosts: {
        posts: [],
        loading: false,
        message: '',
    },
};
const SELECT_MY_POST = 'SELECT_MY_POST';
const SELECT_OTHER_POST = 'SELECT_OTHER_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';
const INSERT_POST = 'INSERT_POST';

export const selectMyPost = createAsyncThunk(SELECT_MY_POST, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { posts } = thunkAPI.getState().posts;
    if (myId) {
        const myPosts = await getPostByUserId(posts, Number(myId));
        return myPosts;
    } else if (myId === 0 || myId === '0') {
        const myPosts = await getPostByUserId(posts, Number(myId));
        return myPosts;
    } else return;
});
export const deletePost = createAsyncThunk(SELECT_OTHER_POST, async (payload, thunkAPI) => {
    const { posts } = thunkAPI.getState().posts;
    return deletePostById(posts, payload);
});
export const selectotherPost = createAsyncThunk(SELECT_OTHER_POST, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { posts } = thunkAPI.getState().posts;
    if (myId) {
        const myPosts = await getPostByOther(posts, Number(myId));
        return myPosts;
    } else if (myId === 0 || myId === '0') {
        const myPosts = await getPostByOther(posts, Number(myId));
        return myPosts;
    }
    return;
});
export const insertPosts = createAsyncThunk(INSERT_POST, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { posts } = thunkAPI.getState().posts;

    const { content, img } = payload;
    const post = { content, img, userId: Number(myId) };
    const myPosts = await postPost(posts, post);
    return myPosts;
});

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(selectMyPost.pending, (state, { payload }) => {
                const newMyPosts = {
                    ...state.myPosts,
                };
            })
            .addCase(selectMyPost.fulfilled, (state, { payload }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                if (payload) {
                    newMyPosts.posts = payload;
                    return { ...state, myPosts: newMyPosts };
                }
            })
            .addCase(selectMyPost.rejected, (state, { error }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                newMyPosts.message = error.message;
                return { ...state, myPosts: newMyPosts };
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                return { ...state, posts: payload };
            })
            .addCase(insertPosts.fulfilled, (state, { payload }) => {
                return { ...state, posts: payload };
            });
    },
});
export default postSlice.reducer;
