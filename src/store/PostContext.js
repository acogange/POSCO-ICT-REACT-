import { createContext, useContext } from 'react';
export const PostContext = createContext({
    posts: [],
    insertPost: (post) => {},
});
