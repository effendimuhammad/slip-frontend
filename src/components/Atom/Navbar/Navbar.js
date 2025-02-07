import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Col, Form } from "react-bootstrap";
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
        // Parse JSON dan ambil username
        const user = JSON.parse(storedUser);

        setUsername(user.username);
        setNim(user.nim); // Hanya mengambil username
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  const handleLogout = () => {
    // Hapus token dari sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Arahkan pengguna ke halaman login
    navigate("/login");
  };

  return (
    <navbar>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">
              <strong style={{ color: "white" }}>Navbar</strong>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/home"
                className="nav-link-bold"
                style={{ color: "white" }}
              >
                <strong>Home</strong>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/about"
                className="nav-link-bold"
                style={{ color: "white" }}
              >
                <strong>About</strong>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className="nav-link-bold"
                style={{ color: "white" }}
              >
                <strong>Contact</strong>
              </Nav.Link>
            </Nav>
            <Col sm="2">
              <Clock onTimeChange={setCurrentTime} />
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Time"
                  value={currentTime}
                  readOnly
                  disabled
                />
              </Col>
            </Col>
            <Nav>
              <Nav.Link className="d-flex align-items-center">
                <span className="badge badge-light">Hello ,</span>{" "}
                <span className="badge badge-light">
                  {username} , {nim}
                </span>
                <Avatar
                  name={username}
                  size="40"
                  round={true}
                  color="#3e9e73"
                />
              </Nav.Link>
              <Nav.Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link-bold"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </navbar>
  );
}

export default Layout;
