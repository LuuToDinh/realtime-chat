import { useEffect, useState } from 'react';
import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { loginAccount } from '../redux/slices/userSlice';
import { getUserChats, getPotentialUserChats } from '../redux/slices/chatSlice';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userInfo = useSelector((state) => state.userInfo);
    const userChats = useSelector((state) => state.userChats);

    const hanleSubmitLogin = (e) => {
        e.preventDefault();

        dispatch(
            loginAccount({
                email,
                password,
            }),
        );
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        if (userInfo?.info?._id) {
            dispatch(getUserChats(userInfo.info));
        }
    }, [userInfo]);

    useEffect(() => {
        if (userInfo?.info?._id && userChats?.info?.userChats?.length > 0) {
            dispatch(getPotentialUserChats(userInfo.info, userChats.info.userChats));
        }
    }, [userChats]);

    return (
        <Form onSubmit={hanleSubmitLogin}>
            <Row
                style={{
                    height: '100vh',
                    justifyContent: 'center',
                    marginTop: '10%',
                }}
            >
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2 className="text-center">Login</h2>
                        <Form.Control
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="primary" type="submit">
                            {userInfo.status.info === 'pending' ? 'Đang gửi yêu cầu đăng nhập' : 'Đăng nhập'}
                        </Button>
                        {userInfo.status.info === 'error' && (
                            <Alert variant="danger">{userInfo.status.errorMessage}</Alert>
                        )}
                        {userInfo.status?.info === 'idle' && userInfo.info?.name && <Navigate to="/" replace={true} />}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Login;
