import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import image from "../../assets/image/5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <div>
          <Row>
            <Col md={4}>
              <h3 className="text-modify">- CONTACT US -</h3>
            </Col>
            <Col md={8} style={{ textAlign: "right" }}>
              <Button
                onClick={() => window.history.back()}
                style={{ margin: "20px" }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div style={{ textAlign: "center" }}>
                <p>DX Kobo Fajar Plant : Ext - 479 </p>
                <img src={image} alt="about" style={{ width: "20%" }} />
              </div>
            </Col>
          </Row>
        </div>

        <Footer />
      </Container>
    </div>
  );
};

export default Contact;
