import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';

function DefaultLayout({ children }) {
    return (
        <div>
            <Navbar />
            <Container>{children}</Container>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
