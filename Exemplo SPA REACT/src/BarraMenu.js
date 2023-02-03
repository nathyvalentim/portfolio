import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';

function BarraMenu() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Login</Navbar.Brand>

            <Nav >
                <NavLink className="nav-item nav-link" to="/contatos">Contatos</NavLink>
            </Nav>
        </Navbar>
    );
}

export default BarraMenu;

