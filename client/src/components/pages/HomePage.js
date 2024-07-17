import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faXTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../../HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <Container className="homepage-container">
      <Row>
        <Col md={8} className="homepage-content">
          <p>
            <strong><h1>Welcome to LionRock88</h1></strong><br />
            At LionRock88, we’re not just a clothing brand; we’re a movement towards a greener, more sustainable future. We believe that fashion shouldn’t come at the cost of our planet, which is why we’ve created a line of skater clothing that’s not only stylish and edgy but also environmentally friendly.
            <h1>Eco-Friendly Promise</h1>
            🌱 Recycled Materials: We’re proud to say that every piece of clothing in our collection is crafted from high-quality recycled materials. By repurposing materials like plastic bottles and discarded textiles, we’re reducing waste and minimizing our carbon footprint.
            🌎 Conscious Production: Our commitment to the environment extends beyond just materials. We’ve implemented sustainable production practices, ensuring that every step of our manufacturing process is as eco-friendly as possible. From energy-efficient machinery to responsible dyeing techniques, we’re mindful of the impact we leave behind.
            <h1>The LionRock88 Style</h1>
            Bold and Edgy: LionRock88’s clothing is designed for those who aren’t afraid to stand out. Our designs are bold, edgy, and reflect the spirit of urban street culture.
            Artistic Expressions: Collaborating with local artists, we bring unique and exclusive artwork to our clothing. Each piece tells a story, adding a layer of depth to your style.
            LionRock88 is a firm believer in circular fashion – a system that promotes recycling, upcycling, and reusing. Our designs are timeless, made to last, and versatile, so they can be mixed and matched for years to come. When you’re ready for something new, return your old LionRock88 items, and we’ll make sure they’re recycled and given a new life.
          </p>
        </Col>
        <Col md={4} className="social-media-section">
          <div className="youtube-section">
            <FontAwesomeIcon icon={faYoutube} size="6x" className="text-danger" />
            <h3>Watch Our Latest Videos</h3>
            <p>
              Watch exciting videos covering travel, lifestyle, and more on our YouTube channel. Don't forget to
              subscribe!
            </p>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="social-icons">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} size="5x" className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="5x" className="social-icon" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="5x" className="social-icon" />
              </a>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="card-style">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300x200.png" />
            <Card.Body>
              <Card.Title>Explore Our Lifestyle</Card.Title>
              <Card.Text>
                Discover our latest lifestyle trends and adventures. Follow our journey!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300x200.png" />
            <Card.Body>
              <Card.Title>Behind the Scenes</Card.Title>
              <Card.Text>
                Get a sneak peek behind the camera and see how we create our content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300x200.png" />
            <Card.Body>
              <Card.Title>Join Our Community</Card.Title>
              <Card.Text>
                Connect with like-minded individuals and share your experiences.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
