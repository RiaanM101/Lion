import React from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faStore, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../NavBar.css';

const NavBar = () => {
  const cartItemCount = useSelector((state) => state.cart.items.length); // Replace 'cart.items.length' with your cart item count selector

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png" // Path relative to the public directory
            width="100"
            height="100"
            className="d-inline-block align-top me-2"
            alt="LionRock88 logo"
          />
          LionRock88
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/login">
            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/store">
            <FontAwesomeIcon icon={faStore} className="me-2" />
            Store
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            <span>{cartItemCount}</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
