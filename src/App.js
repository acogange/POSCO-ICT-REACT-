import { Button } from 'reactstrap';
import BootstrapLogin from './components/Login/BootstrapLogin';
import Page404 from './components/Page404';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Main></Main>}></Route>
                    <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                    <Route path="/join" element={<join></join>}></Route>
                    <Route path="/*" element={<Page404></Page404>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
