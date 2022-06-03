import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../data/User';
import { checkId, getUserById, getUserByUserId, loginApi, logoutApi, postUser } from './userApi';
const initialState = {
    users: User,
    myId: Number(localStorage.getItem('id')),
    isLogin: Number(localStorage.getItem('id')) === undefined ? true : false,
    me: {},
};

const CHECK_ID = 'CHECK_ID';
const LOGIN_CHECK = 'LOGIN_CHECK';
const LOGIN = 'LOGIN';
const INSERT_USER = 'INSERT_USER';
const SELECT_USER_BY_ID = 'SELECT_USER_BY_ID';
const SELECT_USER_BY_USERID = 'SELECT_USER_BY_USERID';
const LOGOUT = 'LOGOUT';
const UPDATE_USERS = 'UPDATE_USERS';
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
    const { users } = thunkAPI.getState().users;
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
export const putUsers = async (users, user, id) => {
    const findUsersIndex = await users.findIndex((user) => user.id === id);
    const { name, img } = user;
    if (findUsersIndex === -1) {
        console.error('not found');
        return;
    }
    const newUsers = [...users];
    newUsers.splice(findUsersIndex, 1, { ...user[findUsersIndex], name, img });
    return newUsers;
};
export const updateUsers = createAsyncThunk(UPDATE_USERS, async (user, thunkAPI) => {
    const { myId, users } = thunkAPI.getState().users;
    const newUsers = await putUsers(users, user, myId);
    return { newUsers, user };
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
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                localStorage.removeItem('id');
                return { ...state, isLogin: false, me: {}, myId: '' };
            })
            .addCase(updateUsers.fulfilled, (state, { payload }) => {
                const { newUsers, user } = payload;
                return { ...state, me: { ...state.me, ...user }, users: newUsers };
            });
    },
});

export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const isLogout = await logoutApi(myId);
    return isLogout;
});
export default userSlice.reducer;
