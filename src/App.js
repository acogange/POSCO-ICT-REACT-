import BootstrapLogin from './components/Login/BootstrapLogin';
import Page404 from './components/Page404';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { User } from './data/User';
import Join from './components/Join/Join';
import { UserContext } from './store/UserContext';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';
import { Follow } from './data/Follow';
import { Post } from './data/Post';
import { FollowContext } from './store/FollowContext';
import { PostContext } from './store/PostContext';
function App() {
    const [users, setUsers] = useState(User);
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length };
        setUsers([...users, newUser]);
        //불변성때문
    };
    const updateUsers = (user) => {
        const id = Number(localStorage.getItem('id'));
        const { img, name } = user;
        const findUsersIndex = users.findIndex((user) => user.id === id);
        if (findUsersIndex === -1) {
            console.error('not found');
            return;
        }
        const NewUsers = [...users];
        NewUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
        setUsers(NewUsers);
    };

    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        const newPost = { ...post, userId: Number(localStorage.getItem('id')), id: posts.length };
        setPosts([...posts, newPost]);
    };
    const [follows, setFollows] = useState(Follow);
    const insertFollow = (followerId) => {
        const newFollow = { following: Number(localStorage.getItem('id')), follower: followerId };
        setFollows([...follows, newFollow]);
    };

    return (
        <div className="App">
            <UserContext.Provider value={{ users, insertUsers, updateUsers }}>
                <PostContext.Provider value={{ posts, insertPost }}>
                    <FollowContext.Provider value={{ follows, insertFollow }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout></Layout>}>
                                    <Route index path="/" element={<Main></Main>}></Route>

                                    <Route index path="shopping" element={<Main></Main>}></Route>
                                    <Route index path="profile" element={<Profile></Profile>}></Route>
                                </Route>

                                <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                                <Route path="/join" element={<Join></Join>}></Route>
                                <Route path="/*" element={<Page404></Page404>}></Route>
                            </Routes>
                        </BrowserRouter>
                    </FollowContext.Provider>
                </PostContext.Provider>
            </UserContext.Provider>
        </div>
    );
}
export default App;
