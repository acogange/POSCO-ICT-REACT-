import { useContext, useState } from 'react';
import { Button, Container, Row, Form, Input, Col, Alert } from 'reactstrap';
import { User } from '../../data/User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';
const BootstrapLogin = () => {
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
    const { users } = useContext(UserContext);
    const onSubmitLogin = (e) => {
        e.preventDefault();
        const findUser = User.find((data) => data.userId === user.id && user.password === data.password);
        if (findUser) {
            localStorage.setItem('id', findUser.id);
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
