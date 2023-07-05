import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';

function Login() {
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
                        <Form.Control type="email" placeholder="email" />
                        <Form.Control type="password" placeholder="password" />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Alert variant="danger">Has an occur</Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Login;
