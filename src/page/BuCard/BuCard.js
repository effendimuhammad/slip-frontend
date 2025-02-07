import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import "./BuCard.css";

const BuCard = ({ nim: propNim }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [nim, setNim] = useState(propNim || "");

  useEffect(() => {
    if (!propNim) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);

          setNim(user.nim);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [propNim]);

  useEffect(() => {
    if (nim) {
      axios
        .get(`http://localhost:4100/api/buCard/getSlipBu/${nim}`)
        .then((response) => {
          const data = response.data.data;
          console.log("data", data);

          const filteredCards = data.filter((card) => {
            return card.nim === parseInt(nim, 10);
          });
          setCards(filteredCards);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [nim]);

  const handleCardClick = (card) => {
    if (card.bu_code) {
      navigate(`/input/${card.bu_code}`, { state: { bu_name: card.bu_name } });
    }
  };
  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <h3 className="text-modify">- INPUT SLIP NUMBER & PART NUMBER -</h3>
        <div className="card-container">
          <Row>
            {cards.map((card, index) => (
              <Col md={2} className="card-col" key={index}>
                <Card className="mb-4 shadow-sm card-link">
                  <Card.Body>
                    <Card.Title className="card-title mb-2 font-weight-bold">
                      {card.bu_code}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card-subtitle font-weight-bold">
                      {card.bu_name}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                      <strong>Product:</strong> {card.product}
                      <br />
                      <strong>Department:</strong> {card.dept}
                      <br />
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={() => handleCardClick(card)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default BuCard;
