import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardLink = ({ to, title, text }) => {
  return (
    <Card className="equal-card" as={Link} to={to}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardLink;
