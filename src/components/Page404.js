import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from './Login/User';

const Page404 = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const id = localStorage.getItem('id');
        const findUser = User.find((data) => data.id === Number(id));
        if (!findUser) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);
    return <></>;
};
export default Page404;
