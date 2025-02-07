import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import Picture2 from "../../assets/image/Picture2.png";
import Picture1 from "../../assets/image/Picture1.png";
import Picture3 from "../../assets/image/Picture3.png";
import Picture4 from "../../assets/image/Picture4.png";
import Picture5 from "../../assets/image/Picture5.png";
import Picture6 from "../../assets/image/Picture6.png";

import "./About.css";

const About = () => {
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />

        <h2>About Page</h2>

        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <img src={Picture1} alt="about" className="img-spacing" />
                <img src={Picture4} alt="about" className="img-spacing" />
                <img src={Picture3} alt="about" className="img-spacing" />

                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <img src={Picture2} alt="about" className="img-spacing" />
                <img src={Picture5} alt="about" className="img-spacing" />
                <img src={Picture6} alt="about" className="img-spacing" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <img src={Picture3} alt="about" />
                <br />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <p>Learn more about us!</p>
        <Footer />
      </Container>
    </div>
  );
};

export default About;
