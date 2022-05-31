import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../store/UserContext';
import { User } from '../data/User';
const AuthRounter = () => {
    const { users } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const id = localStorage.getItem('id');
        const findUser = users.find((data) => data.id === Number(id)); //로그인되있나
        if (!findUser) {
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
