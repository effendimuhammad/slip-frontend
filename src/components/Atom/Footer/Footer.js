import React from "react";
import "./footer.css";
import { Container, Navbar } from "react-bootstrap";

function Footer() {
  return (
    <footer
      id="sticky-footer"
      className="flex-shrink-0 py-2 text-white-50 footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 10,
        right: 5,
        width: "99%",
      }}
    >
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <div className="container text-center">
              Copyright &copy; 2024 Production Management Center, PT Denso
              Indonesia
            </div>
          </Container>
        </Navbar>
      </div>
    </footer>
  );
}

export default Footer;
