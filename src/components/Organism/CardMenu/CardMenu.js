import React from "react";
import { Row, Col } from "react-bootstrap";
import CardLink from "../../Molecule/CardLinkMenu/CardLinkMenu.js";
import "./CardMenu.css";
// import Navbar from "../../Atom/Navbar/Navbar";
// import Footer from "../../Atom/Footer/Footer";

const CardGrid = () => {
  return (
    <Row>
      <Col md={3} className="card-col">
        <CardLink
          to="/user"
          title="Home"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/about"
          title="About"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/contact"
          title="Contact"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/"
          title="Detail"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>

      <Col md={3} className="card-col">
        <CardLink
          to="/summary"
          title="Summary"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/master"
          title="Master"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/buCard"
          title="Input Slip Scrap"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </Col>
    </Row>
  );
};

export default CardGrid;
