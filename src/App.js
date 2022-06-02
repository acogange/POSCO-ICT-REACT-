import { Button } from 'reactstrap';
import BootstrapLogin from './components/Login/BootstrapLogin';
import Page404 from './components/Page404';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { User } from './data/User';
import Join from './components/Join/Join';
import { UserContext } from './store/UserContext';
import Layout from './components/Layout/Layout';
import ProfileBody from './components/Profile/ProfileBody';

function App() {
    const [users, setUser] = useState(User);
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length };
        setUser([...users, newUser]);
        //불변성때문
    };
    return (
        <div className="App">
            <UserContext.Provider value={{ users, insertUsers }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout></Layout>}>
                            <Route index path="/" element={<Main></Main>}></Route>
                            <Route index path="profile" element={<ProfileBody></ProfileBody>}></Route>
                            <Route index path="shopping" element={<Main></Main>}></Route>
                        </Route>

                        <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                        <Route path="/join" element={<Join></Join>}></Route>
                        <Route path="/*" element={<Page404></Page404>}></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}
export default App;
