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

  //Range Date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //sum range
  const [totalSumRangePrice, setTotalSumRangePrice] = useState(0);

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

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const itemDate = parseISO(item.create_date);
        const isWithinDateRange =
          startDate && endDate
            ? itemDate >= startDate && itemDate <= endDate
            : true;
        return (
          (searchTerm === "" ||
            item.kode_slip.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.bu_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.bu_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.total_price.toString().includes(searchTerm)) &&
          (!searchDate ||
            itemDate.toDateString() === searchDate.toDateString()) &&
          isWithinDateRange
        );
      });
      setFilteredData(filtered);
    }
  }, [data, searchTerm, searchDate, startDate, endDate]);

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

  const fetchDateRange = useCallback(() => {
    if (startDate && endDate) {
      const adjustedStartDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      );
      const adjustedEndDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      );
      const formattedDateStartDate = adjustedStartDate
        .toISOString()
        .split("T")[0]; // Format to YYYY-MM-DD
      const formattedDateEndDate = adjustedEndDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

      axios
        .get(
          `http://localhost:4100/api/slip/getDataRange/${bu_code}/${formattedDateStartDate}/${formattedDateEndDate}`
        )
        .then((response) => {
          console.log("API Response Date:", response.data); // Log entire response
          // Set data or handle response as needed
        })
        .catch((err) => console.log("Error fetching total price:", err));
    }
  }, [bu_code, startDate, endDate]);

  const fetchListSumRangePrice = useCallback(() => {
    if (startDate && endDate) {
      const adjustedStartDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      );
      const adjustedEndDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      );
      const formattedDateStartDate = adjustedStartDate
        .toISOString()
        .split("T")[0]; // Format to YYYY-MM-DD
      const formattedDateEndDate = adjustedEndDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

      axios
        .get(
          `http://localhost:4100/api/slip/getSumRange/${bu_code}/${formattedDateStartDate}/${formattedDateEndDate}`
        )
        .then((response) => {
          console.log("API Response Sum:", response.data); // Log entire response
          const total = response.data.data[0]?.total_price_sum || 0; // Get total_price_sum
          setTotalSumRangePrice(total); // Set data or handle response as needed
        })
        .catch((err) => console.log("Error fetching total price:", err));
    }
  }, [bu_code, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchListSumPrice();
  }, [fetchListSumPrice]);

  useEffect(() => {
    fetchListSumRangePrice();
  }, [fetchListSumRangePrice]);

  useEffect(() => {
    fetchDateRange();
  }, [fetchDateRange]);

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
          <Col md={12}>
            <Form.Group
              as={Row}
              id="filterPartNumber"
              className="mb-1 d-flex align-items-center"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Label
                column
                sm="auto"
                style={{ textAlign: "left", marginLeft: "0px" }}
              >
                Search :
              </Form.Label>
              <Col sm="auto">
                <DatePicker
                  id="date"
                  showIcon
                  selected={searchDate}
                  onChange={(date) => setSearchDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date"
                  isClearable
                  style={{ marginLeft: "0px" }} // Menambahkan margin kiri
                />
              </Col>
              <Form.Label
                column
                sm="auto"
                style={{ textAlign: "left", marginLeft: "0px" }}
              >
                Sum :
              </Form.Label>
              <Col sm="auto">
                <Form.Control
                  type="text"
                  id="totalPrice"
                  value={formatRupiah(totalSumPrice)}
                  readOnly
                  disabled
                />
              </Col>
              <Col sm="auto" style={{ padding: "0 10px" }}>
                <div
                  style={{ borderLeft: "5px solid #ccc", height: "30px" }}
                ></div>
              </Col>
              <Form.Label
                column
                sm="auto"
                style={{ textAlign: "left", marginLeft: "0px" }}
              >
                Range :
              </Form.Label>
              <Col sm="auto">
                <Row
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Col style={{ flex: "1" }}>
                    <DatePicker
                      id="startDate" // Menggunakan id
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      isClearable
                    />
                  </Col>
                  <Col style={{ flex: "2" }}>
                    <DatePicker
                      id="endDate" // Menggunakan id
                      showIcon
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      isClearable
                    />
                  </Col>
                </Row>
              </Col>
              <Form.Label
                column
                sm="auto"
                style={{ textAlign: "left", marginLeft: "0px" }}
              >
                Sum :
              </Form.Label>
              <Col sm="auto">
                <Form.Control
                  type="text"
                  id="totalSumRangePrice"
                  value={formatRupiah(totalSumRangePrice)}
                  readOnly
                  disabled
                />
              </Col>
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
