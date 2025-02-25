import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./DataUser.css";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Atom/Footer/Footer.js";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import UserCard from "../../components/Organism/DataTable/CardDataTables.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchListMenu = () => {
    const token = sessionStorage.getItem("token");
    console.log("fendi", token);

    axios
      .post("http://localhost:4100/user", { token: token })
      .then((response) => {
        console.log(response.data.data);
        const data = response.data.data;
        setUsers(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchListMenu();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      // Hapus token dari sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      // Arahkan pengguna ke halaman login
      navigate("/login");
    };

    const interval = setInterval(() => {
      const token = sessionStorage.getItem("token");
      if (token) {
        axios
          .post("http://localhost:4100/token", { token: token })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data.message);
            }
          })
          .catch((err) => handleLogout());
      }
    }, 100000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <Row>
          <Col md={4}>
            <h3 className="text-modify">- HOME PAGE USERS -</h3>
          </Col>
          <Col md={8} style={{ textAlign: "right" }}>
            <Button
              onClick={() => window.history.back()}
              style={{ margin: "20px" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <UserCard users={users} />
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
};

export default Home;
