import { useState } from 'react';
import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { registerAccount } from '../redux/slices/userSlice';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const userInfo = useSelector((state) => state.userInfo);

    const dispatch = useDispatch();

    const hanleSubmitLogin = (e) => {
        e.preventDefault();

        dispatch(
            registerAccount({
                name,
                email,
                password,
            }),
        );
        setName('');
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
                        <h2 className="text-center">Register</h2>
                        <Form.Control
                            type="name"
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            {userInfo.status.info === 'pending' ? 'Đang gửi đăng ký' : 'Gửi'}
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

export default Register;
