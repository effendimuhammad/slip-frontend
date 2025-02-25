import React from "react";
import { Row, Col } from "react-bootstrap";
import CardLink from "../../Molecule/CardLinkMenu/CardLinkMenu.js";
import "./CardMenu.css";
import imagePath from "../../../assets/image/heijunka.gif";
import imagePath1 from "../../../assets/image/dekidaka.gif";
import imagePath2 from "../../../assets/image/receiving2.gif";
import imagePath3 from "../../../assets/image/ditrac.gif";

const CardGrid = () => {
  return (
    <Row>
      <Col md={3} className="card-col">
        <CardLink
          to="/buCard"
          title="Input Slip Scrap"
          text="Information or values that are fed into a system, application, or process for processing, analysis, or storage. "
          image={imagePath3}
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/summary"
          title="Summary Slip"
          text="Summary data provides a concise overview of a larger dataset, highlighting key information and trends."
          image={imagePath1}
        />
      </Col>
      <Col md={3} className="card-col">
        <CardLink
          to="/master"
          title="Master Part Number"
          text="Assigned by a manufacturer to identify a specific product or component within their inventory"
          image={imagePath2}
        />
      </Col>

      <Col md={3} className="card-col">
        <CardLink
          to="/user"
          title="User Login"
          text="Allows users to securely access their accounts by entering their username/email and password"
          image={imagePath}
        />
      </Col>
    </Row>
  );
};

export default CardGrid;
