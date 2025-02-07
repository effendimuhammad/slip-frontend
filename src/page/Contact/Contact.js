import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import FormField from "../../components/Molecule/FormField/FormField.js";
import Button from "../../components/Atom/Button/Button.js";

const Contact = () => {
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <h2>Contact Page</h2>
        <p>Reach out to us!</p>
        <FormField />
        <br />

        <Button>Submit</Button>

        <Footer />
      </Container>
    </div>
  );
};

export default Contact;
