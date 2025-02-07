import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import SlipSummaryChart from "./ChartsSummary.js";
import SlipSummaryDoughnutChart from "./ChartsDougnut.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./SummaryGeneral.css";

const Contact = () => {
  const [data, setData] = useState(null);
  const [doughnut, setDataDougnut] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date());

  const fetchData = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:4100/api/summary/get/${year}`
      );
      setData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchDataDougnut = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:4100/api/summary/getDoughnut/${year}`
      );
      console.log("API response data:", response.data.data);
      setDataDougnut(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    const year = format(selectedYear, "yyyy");
    fetchData(year);
    fetchDataDougnut(year);
  }, [selectedYear]);

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <h3 className="text-modify">- SUMMARY GENERAL PAGE -</h3>

        <br />

        <div className="card-container">
          <Row>
            <Form.Group
              className="form-group-custom"
              style={{ marginBottom: "1.5rem" }}
            >
              <Form.Label>Search Year:</Form.Label>
              <DatePicker
                selected={selectedYear}
                onChange={handleYearChange}
                dateFormat="yyyy"
                showYearPicker
                className="form-control"
              />
            </Form.Group>
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    {data ? (
                      <SlipSummaryChart data={data} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    {Array.isArray(doughnut) && doughnut.length > 0 ? (
                      <SlipSummaryDoughnutChart data={doughnut} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default Contact;
