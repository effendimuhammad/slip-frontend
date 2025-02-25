import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import image from "../../assets/image/6.gif";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <div>
          <Row>
            <Col md={4}>
              <h3 className="text-modify">- INPUT SLIP PART -</h3>
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
                <p>Record & Monitoring of Slip Part based on Product.. </p>
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

// {
//   /* <Row>
//           <Col md={4}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <img src={Picture1} alt="about" className="img-spacing" />
//                 <img src={Picture4} alt="about" className="img-spacing" />
//                 <img src={Picture3} alt="about" className="img-spacing" />

//                 <br />
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <img src={Picture2} alt="about" className="img-spacing" />
//                 <img src={Picture5} alt="about" className="img-spacing" />
//                 <img src={Picture6} alt="about" className="img-spacing" />
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <img src={Picture3} alt="about" />
//                 <br />
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row> */
// }
export default About;
