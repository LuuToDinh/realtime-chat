import { useState } from 'react';
import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { loginSlice } from '../redux/slices';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const hanleSubmitLogin = () => {
        dispatch(
            loginSlice.actions.getLoginInfo({
                email,
                password,
            }),
        );
        setEmail('');
        setPassword('');
    };

    const loginState = useSelector((state) => state.loginInfo);

    return (
        <Form>
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
                        <Button variant="primary" onClick={hanleSubmitLogin}>
                            Submit
                        </Button>
                        <Alert variant="danger">
                            Has an occur: {loginState.email} {loginState.password}
                        </Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Login;
