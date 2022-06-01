import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from './Login/User';
const AuthRounter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const id = localStorage.getItem('id');
        const findUser = User.find((data) => data.id === Number(id)); //로그인되있나
        if (!findUser || !id) {
            const from = location.pathname === '/login' || location.pathname === '/join' ? location.pathname : '/login';
            navigate(from);
        } else {
            //있으면 홈페이지
            const from = location.pathname || '/';
            navigate(from === '/login' || from === '/join' ? '/' : from);
        }
    }, []);
    return <></>;
};
export default AuthRounter;
