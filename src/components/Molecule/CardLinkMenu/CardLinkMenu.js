import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardLink.css"; // Add custom CSS for additional styling

const CardLink = ({ to, title, text, image }) => {
  return (
    <Card className="equal-card" as={Link} to={to}>
      {image && (
        <Card.Img
          className="card-image"
          variant="top"
          src={image}
          alt={title}
        />
      )}
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardLink;
