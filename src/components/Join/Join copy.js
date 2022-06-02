import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Input, Row } from 'reactstrap';
import { UserContext } from '../../store/UserContext';

const Join = () => {
    const [isFail, setIsFail] = useState(false);
    const [text, setText] = useState('');
    const [user, setUser] = useState({
        id: '',
        password: '',
        name: '',
    });
    const navigate = useNavigate();
    const { insertUsers, users } = useContext(UserContext);
    const onSubmitLogin = (e) => {
        e.preventDefault();
        const findUser = users.find((data) => data.userId === user.id);
        if (findUser) {
            //아이디 존재
            openAlert('이미 존재하는 아이디');
            return;
        } else if (user.id === '') {
            //id is null
            openAlert('아이디를 입력해주세요');
            return;
        } else if (user.password === '') {
            //password is null
            openAlert('비밀번호를 입력해주세요');
            return;
        } else if (user.name === '') {
            //name is null
            openAlert('이름을 입력해주세요');
            return;
        } else {
            /* Users.push({ ...user, userId: user.id, id: user.length }); */
            insertUsers(user);
            localStorage.setItem('id', users.length);
            navigate('/');
        }
    };
    const openAlert = (text) => {
        setIsFail(true);
        setText(text);
        setTimeout(() => closeAlert(), 3000);
    };
    const closeAlert = () => {
        setIsFail(false);
        setText('');
    };
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    return (
        <div className="JoinPage">
            <Container className="bg-light border">
                <Row style={{ rowGap: '1em', padding: '3em' }}>
                    <Col xl={12}>
                        <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="Logo"></img>
                    </Col>
                    <Col xl={12}>
                        <Form onSubmit={onSubmitLogin} className="JoinForm">
                            {isFail ? (
                                <Alert color="warning" toggle={() => closeAlert()}>
                                    {text}
                                </Alert>
                            ) : null}
                            <Input type="text" placeholder="ID" name="id" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="password" placeholder="password" name="password" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="text" placeholder="name" name="name" onChange={(e) => onChangeHandler(e)}></Input>
                            <Button type={'submit'} color="primary" block>
                                가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-light border">
                <Row style={{ padding: '1em', textAlign: 'center' }}>
                    <p>
                        계정이 있으신가요? <a href="/login">로그인하기</a>
                    </p>
                </Row>
            </Container>
        </div>
    );
};

export default Join;
