import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faTachometerAlt, faBlog, faStore } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../NavBar.css';

const NavBar = () => {
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
          <Nav.Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" className="text-white me-2" />
          </Nav.Link>
          <Nav.Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white me-2" />
          </Nav.Link>
          <Nav.Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white me-2" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
