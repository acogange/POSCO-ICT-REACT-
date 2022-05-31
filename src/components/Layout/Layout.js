import { Outlet } from 'react-router-dom';
import AuthRounter from '../AuthRouter';
import Menubar from './Menubar';

const Layout = () => {
    return (
        <>
            <AuthRounter></AuthRounter>
            <Outlet />
            <Menubar></Menubar>
        </>
    );
};
export default Layout;
