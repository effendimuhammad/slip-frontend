import React, { useState, useEffect, useCallback } from "react";
// import Footer from "../../components/Atom/Footer/Footer.js";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "./InputSlip.css"; // Import CSS file
import Swal from "sweetalert2";
import PaginationTable from "../../components/Atom/Pagination/Pagination.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import DetailModal from "../DetailSlip/DetailSlip.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faTrash,
  faPaperPlane,
  faChartLine,
  faBell,
  faArrowLeft,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const InputSlip = () => {
  const [kodeSlip, setKodeSlip] = useState("");
  const [items, setItems] = useState([
    { partNumber: "", partName: "", quantity: "", price: "" },
  ]);
  const [users, setUsers] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const dataPerPage = 10;
  const totalPage = Math.ceil(users.length / dataPerPage);

  // Get current data
  const indexOfLastData = page * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = users.slice(indexOfFirstData, indexOfLastData);

  const { bu_code } = useParams(); // Mengambil bu_code dari URL
  const location = useLocation();
  const { bu_name } = location.state || {};

  //Filter data by no.slip
  const [searchTerm, setSearchTerm] = useState("");

  //Filter data by date
  const [searchDate, setSearchDate] = useState(null);

  //modal detail
  const [showModal, setShowModal] = useState(false);
  const [detailData, setDetailData] = useState(null);

  //drop down form
  const [options, setOptions] = useState([]);

  //navigate graph
  const navigate = useNavigate();

  const handleInputChange = (index, eventOrOption) => {
    const values = [...items];

    if (eventOrOption.target) {
      // Handling regular input events
      const { name, value } = eventOrOption.target;
      values[index][name] = name === "quantity" ? parseInt(value, 10) : value;
    } else {
      // Handling react-select events
      values[index].partNumber = eventOrOption.value;
      values[index].partName = eventOrOption.partName;
      values[index].price = eventOrOption.price;
    }

    setItems(values);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { partNumber: "", partName: "", quantity: 0, price: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { kode_slip: kodeSlip, bu_code, bu_name, items };
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        "http://localhost:4100/api/slip/insertSlip",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Data successfully submitted!",
          text: "Anda telah berhasil menambahkan data..",
          timer: 500,
          showConfirmButton: false,
        }).then(() => {
          resetForm();
          fetchListMenu();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login gagal!",
          text: "Coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data.");
    }
  };

  const resetForm = () => {
    setKodeSlip("");
    setItems([{ partNumber: "", partName: "", quantity: 0, price: 0 }]);
  };

  const fetchListMenu = useCallback(() => {
    if (bu_code) {
      axios
        .get(`http://localhost:4100/api/slip/getAllPartSlip/${bu_code}`)
        .then((response) => {
          // console.log(response.data.data);
          const data = response.data.data;
          setUsers(data);
        });
    }
  }, [bu_code]);

  useEffect(() => {
    fetchListMenu();
  }, [bu_code, fetchListMenu]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const filteredData = currentData.filter((item) => {
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

  //modal detail
  const handleClose = () => setShowModal(false);
  const handleShow = (data) => {
    setDetailData(data);
    setShowModal(true);
  };

  const handleDetailClick = async (kode_slip) => {
    const data = await fetchDetailData(kode_slip);
    if (data) {
      handleShow(data);
      console.log("data modal", data);
    }
  };

  const fetchDetailData = async (kode_slip) => {
    try {
      const response = await axios.get(
        `http://localhost:4100/api/slip/detail/${kode_slip}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching detail data:", error);
      return null;
    }
  };

  //drop down
  const fetchListPartNumber = useCallback(() => {
    if (bu_code) {
      axios
        .get(
          `http://localhost:4100/api/slip/getDropDownPartNumberSlip/${bu_code}`
        )
        .then((response) => {
          const data = response.data.data.map((item) => ({
            value: item.partnumber,
            label: item.partnumber,
            partName: item.partname,
            price: item.price,
          }));
          setOptions(data);
        })
        .catch((error) => {
          console.error("Error fetching part numbers:", error);
        });
    }
  }, [bu_code]);

  useEffect(() => {
    fetchListPartNumber();
  }, [bu_code, fetchListPartNumber]);

  const handleHapusClick = async (kode_slip) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:4100/api/slip/delete/${kode_slip}`
        );
        fetchListMenu();
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire("Error!", "An error occurred while deleting data.", "error");
      }
    }
  };

  const handleGraphClick = () => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we navigate to the chart data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      navigate("/chartBu", { state: { bu_code } });
    }, 1000); // Adjust th
  };

  const handleGraphClickData = () => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we navigate to the chart data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      navigate("/chartdata", { state: { bu_code } });
    }, 1000); // Adjust the timeout as needed
  };

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <Row>
          <Col md={4}>
            <h3 className="text-modify">
              {bu_code} - {bu_name}
            </h3>
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
          <Col md={4}>
            <Card className="margin-top">
              <Card.Body>
                <Card.Title>
                  <h2 className="card-title">Input Slip</h2>
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3 form-group">
                    <Form.Label column sm={2} className="form-label-kode">
                      Kode Slip:
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        value={kodeSlip}
                        onChange={(e) =>
                          setKodeSlip(e.target.value.toUpperCase())
                        }
                        required
                        className="form-control"
                        placeholder="Masukkan Kode Slip"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Control type="hidden" value={bu_code} />
                  <Form.Control type="hidden" value={bu_name} />

                  <div className="item-list scrollable">
                    {items.map((item, index) => (
                      <div key={index} className="item-group">
                        <Form.Group as={Row} className="mb-3 form-group">
                          <Form.Label column sm={2} className="form-label">
                            Part Number:
                          </Form.Label>
                          <Col sm={10}>
                            <Select
                              name="partNumber"
                              value={options.find(
                                (option) => option.value === item.partNumber
                              )}
                              onChange={(selectedOption) =>
                                handleInputChange(index, selectedOption)
                              }
                              options={options}
                              placeholder="-- Pilih Part Number --"
                              className="form-control"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 form-group">
                          <Form.Label column sm={2} className="form-label">
                            Part Name:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              name="partName"
                              value={item.partName}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                              className="form-control"
                              readOnly
                              disabled
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 form-group">
                          <Form.Label column sm={2} className="form-label">
                            Price:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="number"
                              name="price"
                              value={item.price}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                              className="form-control"
                              readOnly
                              disabled
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 form-group">
                          <Form.Label column sm={2} className="form-label">
                            Quantity:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="number"
                              name="quantity"
                              value={item.quantity}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                              className="form-control"
                            />
                          </Col>
                        </Form.Group>

                        <Button
                          variant="danger"
                          onClick={() => handleRemoveItem(index)}
                          className="danger"
                        >
                          <FontAwesomeIcon icon={faTrash} /> Remove Item
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-end button-group">
                    <Button variant="secondary" onClick={handleAddItem}>
                      <FontAwesomeIcon icon={faFileAlt} /> Add
                    </Button>
                    <Button variant="primary" type="submit">
                      {" "}
                      <FontAwesomeIcon icon={faPaperPlane} /> Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <div>
              <Card className="margin-top">
                <Card.Body className="card-body-scrollable">
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <h2 className="card-title">List Slip</h2>
                    <div className="ml-auto btn-group">
                      <Button
                        variant="success"
                        onClick={handleGraphClickData}
                        className="primary"
                      >
                        <FontAwesomeIcon icon={faDatabase} /> Data
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleGraphClick}
                        className="primary"
                      >
                        <FontAwesomeIcon icon={faChartLine} /> Graph
                      </Button>
                    </div>
                  </Card.Title>
                  <div className="card-body ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div>
                        <label htmlFor="search">Search:</label>
                        <input
                          type="text"
                          id="search"
                          placeholder="No. Slip.."
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ marginLeft: "10px" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="date">Date:</label>
                        <DatePicker
                          id="date"
                          selected={searchDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          isClearable
                          placeholderText="Select a date"
                          style={{ marginLeft: "10px" }}
                        />
                      </div>
                    </div>

                    <Table className="table table-bordered">
                      <thead>
                        <tr className="table table-hover">
                          <td>
                            <center>Nomer Slip</center>
                          </td>
                          <td>
                            <center>Bu Code</center>
                          </td>
                          <td>
                            <center>Product</center>
                          </td>
                          <td>
                            <center>Tanggal Input</center>
                          </td>
                          <td>
                            <center>Detail</center>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{item.kode_slip}</td>
                            <td>{item.bu_code}</td>
                            <td>{item.bu_name}</td>
                            <td>{item.create_date}</td>
                            <td>
                              <div>
                                <center>
                                  <div className="d-flex justify-content-center button-group">
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        handleDetailClick(item.kode_slip)
                                      }
                                    >
                                      {" "}
                                      <FontAwesomeIcon icon={faBell} />
                                      Detail
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleHapusClick(item.kode_slip)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrash} /> Hapus
                                    </Button>
                                  </div>
                                </center>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <DetailModal
                      show={showModal}
                      handleClose={handleClose}
                      detailData={detailData}
                      bu_code={bu_code}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PaginationTable
                      totalPage={totalPage}
                      onChangePage={(e) => setPage(e)}
                      pageActive={page}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InputSlip;
