import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../data/User';
import { checkId, getUserById, getUserByUserId, loginApi, postUser } from './userApi';
const initialState = {
    users: User,
    myId: localStorage.getItem('id'),
    isLogin: localStorage.getItem('id') === undefined ? true : false,
    me: {},
};

const CHECK_ID = 'CHECK_ID';
const LOGIN_CHECK = 'LOGIN_CHECK';
const LOGIN = 'LOGIN';
const INSERT_USER = 'INSERT_USER';
const SELECT_USER_BY_ID = 'SELECT_USER_BY_ID';
const SELECT_USER_BY_USERID = 'SELECT_USER_BY_USERID';
const LOGOU = 'LOGOUT';

export const getCheckId = createAsyncThunk(CHECK_ID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    return await checkId(users, userId);
});
export const loginCheck = createAsyncThunk(LOGIN_CHECK, async (payload, thunkAPI) => {
    const { users, myId } = thunkAPI.getState().users;
    if (myId) {
        const me = await getUserById(users, Number(myId));
        return me;
    } else if (myId === 0 || myId === '0') {
        const me = await getUserById(users, Number(myId));
        return me;
    }
});
export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().user;
    const isLogin = await loginApi(users, user);
    return isLogin;
});
export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await postUser(users, user);
    return newUser;
});
export const selectUserById = createAsyncThunk(SELECT_USER_BY_USERID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserByUserId(users, userId);
    return newUser;
});

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheck.fulfilled, (state, { payload }) => {
                if (payload) {
                    return { ...state, isLogin: true, me: payload };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.isLogin) {
                    localStorage.setItem('id', payload.user.id);
                    return { ...state, isLogin: payload.login, me: payload.user, myId: payload.user.id };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(insertUser.fulfilled, (state, { payload }) => {
                return { ...state, users: payload };
            });
    },
});
export default userSlice.reducer;
