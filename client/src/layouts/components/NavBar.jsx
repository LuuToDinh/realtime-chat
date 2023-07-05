import { Container, Stack, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar bg="dark" className="mb-4" style={{ height: '3.75rem' }}>
            <Container>
                <Link to="/" className="link-light">
                    <h2>Chat</h2>
                </Link>
                <span className="text-warning">Login as Chard</span>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        <Link to="/login" className="link-light">
                            Login
                        </Link>
                        <Link to="/register" className="link-light">
                            Register
                        </Link>
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
