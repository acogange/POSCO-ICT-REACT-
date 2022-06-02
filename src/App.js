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
        //user : User의 한묶음의 데이터/  join.js 에서 정의된다
        const newUser = { ...user, userId: user.id, id: users.length };
        //...user 에다가 뒤에것들 추가하겠다
        setUsers([...users, newUser]); //users에다가 새로운 애 넣겠다 (다만 이건 DB나 session이 아니고 그냥 겉보기라서 users에 새로운 애 안들어감)
        //불변성때문
    };
    const updateUsers = (user) => {
        //이름과 프로필 사진 update
        const id = Number(localStorage.getItem('id')); //지금 로그인한 id 갖고와
        const { img, name } = user; //받아온 user의 정보
        const findUsersIndex = users.findIndex((user) => user.id === id);
        if (findUsersIndex === -1) {
            console.error('not found');
            return;
        }
        const NewUsers = [...users];
        NewUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img }); //findUsersIndex : 배열 변경할 시작 인덱스, 1 : 변경할 요소 수, {  } : ...users[] : 제거한 요소 담은 배열 , name img : 새로 추가할 요소
        setUsers(NewUsers); //업데이트 완!
    };

    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        //post 갯수 알려줌
        const newPost = { ...post, userId: Number(localStorage.getItem('id')), id: posts.length };
        setPosts([...posts, newPost]);
    };
    const deletePost = (postId) => {
        const delPosts = posts.filter((post) => post.id !== postId);
        setPosts(delPosts);
    };
    const [follows, setFollows] = useState(Follow);
    const insertFollow = (followerId) => {
        //팔로워 갯수 알려줌
        const newFollow = { following: Number(localStorage.getItem('id')), follower: followerId };
        setFollows([...follows, newFollow]);
    };

    return (
        <div className="App">
            {/* Context : 컴포넌트 안 데이터를 전역적으로 공유하기 위함
            Provider: 정의한 Context를 하위 컴포넌트에게 전달
            */}
            <UserContext.Provider value={{ users, insertUsers, updateUsers }}>
                <PostContext.Provider value={{ posts, insertPost, deletePost }}>
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
