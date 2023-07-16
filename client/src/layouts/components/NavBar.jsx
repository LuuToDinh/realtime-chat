import { Container, Stack, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../redux/slices';

function NavBar() {
    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('user'))?.userInfo;

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(userSlice.actions.setInfoUser({}));
    };

    return (
        <Navbar bg="dark" className="mb-4" style={{ height: '3.75rem' }}>
            <Container>
                <Link to="/" className="link-light">
                    <h2>Chat</h2>
                </Link>
                {userInfo?.name && <span className="text-warning">Login as {userInfo?.name}</span>}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {userInfo?.name ? (
                            <>
                                <Link to="/login" className="link-light" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="link-light">
                                    Login
                                </Link>
                                <Link to="/register" className="link-light">
                                    Register
                                </Link>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
