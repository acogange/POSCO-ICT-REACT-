import './Login.css';
import { Button } from 'bootstrap';
const Login = () => {
    return (
        <div className="LoginPage">
            <div className="Box">
                <div className="imgBox">
                    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="logo"></img>
                </div>
                <div className="LoginBox">
                    <input type="text" placeholder="Id"></input>
                    <input type="password" placeholder="Password"></input>
                    <Button>로그인</Button>
                </div>
            </div>
            <div className="Box">
                <p>
                    계정이 없으신가요? <a href="/join">가입하기</a>
                </p>
            </div>
        </div>
    );
};
export default Login;
