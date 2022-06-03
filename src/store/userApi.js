export const getUserById = async (users, id) => {
    const findUserById = await users.find((user) => user.id === id);
    return findUserById;
};
export const getUserByUserId = async (users, userId) => {
    const findUserByUserId = await users.find((user) => user.userId === userId);
    return findUserByUserId;
};
export const postUser = async (users, user) => {
    const newUser = { ...user, userId: user.id, id: users.length };
    return [...users, newUser];
};
export const loginApi = async (users, user) => {
    const checkUser = await users.find((data) => data.userId === user.user.id && data.password === user.user.password); //강사님 잘못으로 객체안에 객체가 생겨버림

    return { isLogin: checkUser ? true : false, user: checkUser };
};
export const checkId = async (users, userId) => {
    const isCheckId = (await users.find((user) => user.userId === userId)) ? true : false;
    return isCheckId;
};
export const logoutApi = async (userId) => {
    return true;
};
