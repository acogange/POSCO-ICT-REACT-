import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Form, Input, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/users';
import AuthRouter from '../AuthRouter';
import './Login.css';
const BootstrapLogin = () => {
    const dispatch = useDispatch();
    const [isFail, setIsFail] = useState(false);
    const [user, setUser] = useState({
        id: '',
        password: '',
    });
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const navigate = useNavigate();
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        //const {isLogin}=await dispatch(login(user)).unwrap();
        const isLogin = await dispatch(login({ user })).unwrap();
        if (isLogin) {
            navigate('/');
        } else {
            setIsFail(true);
            setTimeout(() => closeAlert(), 3000);
        }
    };
    const closeAlert = () => {
        setIsFail(false);
    };

    return (
        <div className="LoginPage">
            <Container className="bg-light border">
                <Row style={{ rowGap: '1em', padding: '3em' }}>
                    <Col xl={12}>
                        <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="logo"></img>
                    </Col>
                    <Col xl={12}>
                        <Form onSubmit={onSubmitLogin} className="LoginForm">
                            {isFail ? (
                                <Alert color="warning " toggle={() => closeAlert()}>
                                    아이디 또는 비밀번호가 틀렸습니다.
                                </Alert>
                            ) : null}

                            <Input type="text" placeholder="ID" name="id" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="password" placeholder="password" name="password" onChange={(e) => onChangeHandler(e)}></Input>
                            <Button type={'submit'} color="primary" block>
                                login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container className="bg-light border">
                <Row style={{ padding: '1em', textAlign: 'center' }}>
                    <p>
                        계정이 없으신가요? <a href="/Join"> 가입하기</a>
                    </p>
                </Row>
            </Container>
        </div>
    );
};
export default BootstrapLogin;
