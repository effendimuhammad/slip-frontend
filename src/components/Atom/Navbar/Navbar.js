import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Clock from "./ClockRealtime";

function Layout() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nim, setNim] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
        setNim(user.nim);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand
          href="/home"
          className="navbar-brand"
          style={{ color: "white" }}
        >
          {/* <img src={gambarData} alt="logo" className="navbar-logo" /> */}
          <strong>Navbar</strong>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/home"
            className="nav-link nav-link-bold"
            style={{ color: "white" }}
          >
            <strong>Home</strong>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/about"
            className="nav-link nav-link-bold"
            style={{ color: "white" }}
          >
            <strong>About</strong>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/contact"
            className="nav-link nav-link-bold"
            style={{ color: "white" }}
          >
            <strong>Contact</strong>
          </Nav.Link>
        </Nav>
        <Col sm="2">
          <Clock onTimeChange={setCurrentTime} />
          <div
            className="current-time"
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            {currentTime}
          </div>
        </Col>
        <Nav className="d-flex align-items-center">
          <span className="badge badge-light">Hello .....</span>
          <span className="badge badge-light">
            {username}, {nim}
          </span>
          <Avatar name={username} size="40" round={true} color="#3e9e73" />
          <button
            onClick={handleLogout}
            className="btn btn-link nav-link-bold"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />{" "}
            <span className="badge badge-light">logout</span>
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Layout;
