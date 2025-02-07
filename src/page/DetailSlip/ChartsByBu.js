import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import Footer from "../../components/Atom/Footer/Footer.js";
import axios from "axios";
import { format } from "date-fns";

const DataChart = ({ buCode }) => {
  //   console.log("bu_code", buCode);
  //   const bu_code = buCode.map((item) => item.buCode);
  //   console.log("bu_code", bu_code);

  //   const [selectedYear, setSelectedYear] = useState(new Date());

  //   const fetchData = async (year) => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:4100/api/summary/getByBu/${year}/${bu_code}`
  //       );
  //       setSelectedYear(response.data.data[0]);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };
  //   useEffect(() => {
  //     const year = format(selectedYear, "yyyy");
  //     fetchData(year);
  //   }, [selectedYear]);

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <h3 className="text-modify">- SUMMARY GENERAL PAGE -</h3>

        <Footer />
      </Container>
    </div>
  );
};

export default DataChart;
