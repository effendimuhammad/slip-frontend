import React from "react";
import { Container, Row } from "react-bootstrap";
import CardGrid from "../../components/Organism/CardMenu/CardMenu.js";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";

const Layout = () => {
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <h3 className="text-modify">- WELCOME, TO DASHBOARD -</h3>
        <Row>
          <CardGrid />
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
