import React, { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartByBuBar from "./ChartByBuBar.js";
import HorizontalBarChart from "./ChartByBuHorizontalBar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChartBarTumpuk from "./ChartBarTumpuk.js";

const DataChart = () => {
  const [data, setData] = useState(null);
  const [horizonBar, setHorizontalBar] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date());
  const location = useLocation();
  const { bu_code } = location.state || {};
  const [sumPrice, setSumPrice] = useState(0);
  const [partNameTop, setPartNameTop] = useState(0);
  const [partNumberTop, setPartNumberTop] = useState(0);
  const [stackedData, setStackedData] = useState([]);
  const [bunameStacked, setBunameStacked] = useState([]);

  //format-rupiah
  const formatRupiah = (number) => {
    if (number === null || number === undefined) {
      return "Rp 0";
    }
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  console.log("bucode", bu_code);

  //BAR CHART
  const fetchData = useCallback(
    async (year) => {
      try {
        const response = await axios.get(
          `http://localhost:4100/api/summary/getByBu/${year}/${bu_code}`
        );
        setData(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
    [bu_code]
  );

  //BAR HORIZONTAL
  const fetchDataBarHorizontal = useCallback(
    async (year) => {
      try {
        const response = await axios.get(
          `http://localhost:4100/api/summary/getByBuHorizontal/${year}/${bu_code}`
        );
        if (response.data.data.length > 0) {
          setHorizontalBar(response.data.data);
          const buName = response.data.data[0].bu_name;
          const partNameTop = response.data.data[0].partName;
          const PartNumberTop = response.data.data[0].partNumber;
          setPartNameTop(partNameTop);
          setPartNumberTop(PartNumberTop);
          setBunameStacked(buName);
        } else {
          setHorizontalBar([]);
          setPartNameTop("");
          setPartNumberTop("");
          setBunameStacked("");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setHorizontalBar([]);
        setPartNameTop("");
        setPartNumberTop("");
        setBunameStacked("");
      }
    },
    [bu_code]
  );

  //SUM PRICE
  const fetchListSumPrice = useCallback(
    async (year) => {
      try {
        const response = await axios.get(
          `http://localhost:4100/api/summary/getSummaryPriceByBU/${year}/${bu_code}`
        );
        if (response.data.data.length > 0) {
          const data = response.data.data[0];
          setSumPrice(data.Total_Price);
        } else {
          setSumPrice(0);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
    [bu_code]
  );

  //STAKED BAR
  const fetchDataStakedBar = useCallback(
    async (year) => {
      console.log(year);
      try {
        const response = await axios.get(
          `http://localhost:4100/api/summary/getStakedBar/${year}/${bu_code}`
        );
        setStackedData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
        setStackedData([]);
      }
    },
    [bu_code]
  );

  useEffect(() => {
    if (bu_code) {
      const currentYear = new Date().getFullYear(); // Get the current year
      fetchData(currentYear);
      fetchDataBarHorizontal(currentYear);
      fetchListSumPrice(currentYear); // Pass the current year to fetchListSumPrice
      fetchDataStakedBar(currentYear);
    }
  }, [
    bu_code,
    fetchData,
    fetchDataBarHorizontal,
    fetchListSumPrice,
    fetchDataStakedBar,
  ]); // Add buCode as a dependency

  const handleYearChange = (date) => {
    const year = date.getFullYear();
    setSelectedYear(date);
    fetchData(year); // Fetch data for the selected year
    fetchDataBarHorizontal(year); // Fetch horizontal bar data for the selected year
    fetchListSumPrice(year); // Fetch summary price for the selected year
    fetchDataStakedBar(year);
  };

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <Row>
          <Col md={4}>
            <h5 className="text-modify">
              - SUMMARY PAGE - [ {bu_code} {bunameStacked} ]
            </h5>
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
          <Form.Group as={Row} controlId="filterPartNumber" className="mb-3">
            <Form.Label column sm="1">
              Search Year .
            </Form.Label>
            <Col sm="2">
              <DatePicker
                selected={selectedYear}
                onChange={handleYearChange}
                dateFormat="yyyy"
                showYearPicker
                className="form-control"
              />
            </Col>

            <Form.Label column sm="1">
              Summary Price .
            </Form.Label>
            <Col sm="2">
              <Form.Control
                type="text"
                placeholder="Enter part number"
                value={sumPrice ? formatRupiah(sumPrice) : "No data available"}
                readOnly
                disabled
              />
            </Col>

            <Form.Label column sm="1">
              P/N Top Price .
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Enter part number"
                value={
                  partNameTop
                    ? `${partNameTop} (${partNumberTop})`
                    : "No data available"
                }
                readOnly
                disabled
              />
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  {data ? (
                    <ChartByBuBar data={data} />
                  ) : (
                    <p>No data available ...</p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  {Array.isArray(horizonBar) && horizonBar.length > 0 ? (
                    <HorizontalBarChart data={horizonBar} />
                  ) : (
                    <p>No data available ...</p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  {stackedData.length > 0 ? (
                    <ChartBarTumpuk data={stackedData} />
                  ) : (
                    <p>No data available ...</p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
};

export default DataChart;
