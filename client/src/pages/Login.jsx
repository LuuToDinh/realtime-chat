import { useState } from 'react';
import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { loginAccount } from '../redux/slices/userSlice';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userInfo = useSelector((state) => state.userInfo);

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
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Login;
