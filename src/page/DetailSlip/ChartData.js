import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Table, Col, Row, Button, Form } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";

function ChartData() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { bu_code } = location.state || {};
  const [buName, setBuName] = useState("");
  // Filter data by date
  const [searchDate, setSearchDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Data yang sudah difilter
  const [totalSumPrice, setTotalSumPrice] = useState(0); // Data yang sudah difilter
  const [searchTerm] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4100/api/slip/get/${bu_code}`
      );
      setData(response.data.data);
      setFilteredData(response.data.data);

      if (response.data.data.length > 0) {
        setBuName(response.data.data[0].bu_name);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [bu_code]);

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const itemDate = parseISO(item.create_date);
        return (
          (searchTerm === "" ||
            item.kode_slip.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.bu_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.bu_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.total_price.toString().includes(searchTerm)) &&
          (!searchDate || itemDate.toDateString() === searchDate.toDateString())
        );
      });
      setFilteredData(filtered);
    }
  }, [data, searchDate, searchTerm]);

  const fetchListSumPrice = useCallback(() => {
    if (searchDate) {
      const adjustedDate = new Date(
        searchDate.getTime() - searchDate.getTimezoneOffset() * 60000
      );
      const formattedDate = adjustedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

      axios
        .get(
          `http://localhost:4100/api/slip/getData/${bu_code}/${formattedDate}`
        )
        .then((response) => {
          console.log("API Response:", response.data); // Log entire response
          const total = response.data.data[0]?.total_price_sum || 0; // Get total_price_sum
          setTotalSumPrice(total);
        })
        .catch((err) => console.log("Error fetching total price:", err));
    } else {
      setTotalSumPrice(0); // Reset total if no date is selected
    }
  }, [bu_code, searchDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchListSumPrice();
  }, [fetchListSumPrice]);

  const formatRupiah = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  // Group data by kode_slip and calculate rowSpan
  const groupedData = filteredData?.reduce((acc, item) => {
    if (!acc[item.kode_slip]) {
      acc[item.kode_slip] = [];
    }
    acc[item.kode_slip].push(item);
    return acc;
  }, {});

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />

        <Row>
          <Col md={10}>
            <h4 className="text-modify">
              {" "}
              - DATA TRANSAKSI PART NUMBER - {bu_code} - {buName}
            </h4>
          </Col>
          <Col md={2} style={{ textAlign: "right" }}>
            <Button
              onClick={() => window.history.back()}
              style={{ margin: "20px" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="margin-top">
            <Form.Group as={Row} controlId="filterPartNumber" className="mb-3">
              <div>
                <label htmlFor="date">Date: </label>
                <DatePicker
                  id="date"
                  selected={searchDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  isClearable
                  placeholderText="Select a date"
                  style={{ marginLeft: "10px" }}
                />
                <label htmlFor="totalPrice" style={{ marginLeft: "20px" }}>
                  Summary Total Price:
                </label>
                <input
                  type="text"
                  id="totalPrice"
                  value={formatRupiah(totalSumPrice)} // Display total price
                  style={{ marginLeft: "10px" }}
                  readOnly
                  disabled
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Table className="table table-bordered">
          <thead>
            <tr className="table table-hover">
              <td>
                <center>No Slip</center>
              </td>
              <td>
                <center>Bu Name</center>
              </td>
              <td>
                <center>Bu Code</center>
              </td>
              <td>
                <center>Part Number</center>
              </td>
              <td>
                <center>Part Name</center>
              </td>
              <td>
                <center>Quantity</center>
              </td>
              <td>
                <center>Price</center>
              </td>
              <td>
                <center>Total Price</center>
              </td>
              <td>
                <center>Tanggal Input</center>
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.length > 0 ? (
              Object.keys(groupedData).map((kode_slip) => {
                const items = groupedData[kode_slip];
                return items.map((item, index) => (
                  <tr key={index}>
                    {index === 0 && (
                      <td rowSpan={items.length}>{item.kode_slip}</td>
                    )}
                    <td>{item.bu_name}</td>
                    <td>{item.bu_code}</td>
                    <td>{item.partNumber}</td>
                    <td>{item.partName}</td>
                    <td>{item.quantity}</td>
                    <td>{formatRupiah(item.price)}</td>
                    <td>{formatRupiah(item.total_price)}</td>
                    <td>{item.create_date}</td>
                  </tr>
                ));
              })
            ) : (
              <tr>
                <td colSpan="9">
                  <center>No data available</center>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ChartData;
