import { Form, Row, Col, Stack, Button, Alert } from 'react-bootstrap';

function Register() {
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
                        <h2 className="text-center">Register</h2>
                        <Form.Control type="email" placeholder="email" />
                        <Form.Control type="password" placeholder="password" />
                        <Form.Control type="password" placeholder="retype password" />
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

export default Register;
