import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../../Footer.css'; // Custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>About LionRock88</h5>
            <p>
              At LionRock88, we are committed to creating stylish, eco-friendly skater clothing. Join us in our journey towards a sustainable future.
            </p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/store" className="text-white">Store</a></li>
              <li><a href="/blogs" className="text-white">Blogs</a></li>
              <li><a href="/faq" className="text-white">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <div className="d-flex">
              <a href="https://twitter.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://youtube.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
            </div>
          </Col>
          <Col md={3}>
            <h5>Subscribe to our Newsletter</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" className="mb-2" />
                <Button variant="primary" type="submit">Subscribe</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} LionRock88. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
