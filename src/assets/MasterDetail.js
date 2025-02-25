import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Button,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFolderPlus,
  faArrowLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "./MasterDetail.css";
import axios from "axios";
import Swal from "sweetalert2";

const MasterDetail = () => {
  const { bu_code } = useParams();
  const location = useLocation();
  const { bu_name } = location.state || {};
  const [part, setPart] = useState([]);
  const [partnumber, setPartNo] = useState("");
  const [partname, setPartName] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

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

  // Modal Edit
  const [showEdit, setShowEdit] = useState(false);
  const [partNumberEdit, setPartNumberEdit] = useState("");
  const [partNameEdit, setPartNameEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

  //filter
  const [filter, setFilter] = useState("");

  const fetchListMaster = useCallback(() => {
    axios
      .get(`http://localhost:4100/api/partnumber/get/${bu_code}`)
      .then((response) => {
        console.log(response.data.data);

        setPart(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [bu_code]);

  useEffect(() => {
    fetchListMaster();
  }, [fetchListMaster]);

  // Handle Edit
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (partnumber_id) => {
    const id = partnumber_id;
    console.log(id);

    if (id) {
      axios
        .get(`http://localhost:4100/api/partnumber/getEdit/${id}`)
        .then((response) => {
          const data = response.data.data[0];
          console.log("data modal", data);

          if (data) {
            setPartNumberEdit(data.partnumber);
            setPartNameEdit(data.partname);
            setPriceEdit(data.price);
            setIdEdit(id);
            setShowEdit(true);
          } else {
            console.error("Data is undefined");
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const data = {
      partnumber: partNumberEdit,
      partname: partNameEdit,
      price: priceEdit,
      bu_code: bu_code, // Pastikan bu_code tetap ada
      bu_name: bu_name, // Pastikan bu_name tetap ada
    };
    console.log("Data to be saved:", data);
    axios
      .patch(`http://localhost:4100/api/partnumber/update/${idEdit}`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Data successfully updated!",
          text: "Anda telah berhasil memperbarui data.",
          timer: 500,
          showConfirmButton: false,
        }).then(() => {
          fetchListMaster();
          handleCloseEdit();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update failed!",
          text: "Coba lagi.",
        });
        console.log(err);
      });
  };

  const handleShowDelete = (partnumber_id) => {
    const id = partnumber_id;
    console.log(id);

    if (id) {
      axios
        .delete(`http://localhost:4100/api/partnumber/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Data successfully deleted!",
            text: "Anda telah berhasil menghapus data.",
            timer: 500,
            showConfirmButton: false,
          }).then(() => {
            fetchListMaster();
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Deletion failed!",
            text: "Coba lagi.",
          });
          console.log(err);
        });
    }
  };

  // State for Add Item Modal
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleAddItem = async (event) => {
    event.preventDefault();
    const data = {
      bu_code: bu_code, // Pastikan bu_code tetap ada
      bu_name: bu_name,
      partnumber,
      partname,
      price,
    };
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        "http://localhost:4100/api/partnumber/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Data successfully submitted!",
          text: "Anda telah berhasil menambahkan data..",
          timer: 500,
          showConfirmButton: false,
        }).then(() => {
          resetForm();
          fetchListMaster();
          handleCloseAdd(); // Close the modal
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
    setPartNo("");
    setPartName("");
    setPrice("");
  };

  //filter
  const filteredParts = part.filter((data) =>
    data.partnumber.toLowerCase().includes(filter.toLowerCase())
  );

  //TOTAL PART MASTER & PRICE MASTER

  const fetchListPriceQtyMaster = useCallback(() => {
    axios
      .get(`http://localhost:4100/api/partnumber/getPartMaster/${bu_code}`)
      .then((response) => {
        console.log("rego", response.data.data);
        const data = response.data.data[0];
        setTotalPrice(data.total_price);
        setTotalQty(data.total_partnumbers);
      })
      .catch((err) => console.log(err));
  }, [bu_code]);

  useEffect(() => {
    fetchListPriceQtyMaster();
  }, [fetchListPriceQtyMaster]);

  return (
    <div>
      <Container fluid className="mt-10">
        <Navbar />
        <Row>
          <Col md={4}>
            <h3 className="text-modify">
              {" "}
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
            <Button onClick="" style={{ margin: "20px" }}>
              <FontAwesomeIcon icon={faDownload} /> Download
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={10} className="margin-top">
            <Form.Group as={Row} controlId="filterPartNumber" className="mb-3">
              <Form.Label column sm="1">
                Search Part No.
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  placeholder="Enter part number"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </Col>

              <Form.Label column sm="1">
                Total Price.
              </Form.Label>
              <Col sm="2">
                <Form.Control
                  type="text"
                  placeholder="Enter part number"
                  value={formatRupiah(totalPrice)}
                  readOnly
                  disabled
                />
              </Col>
              <Form.Label column sm="1">
                Total Part No. :
              </Form.Label>
              <Col sm="1">
                <Form.Control
                  type="text"
                  placeholder="Enter part number"
                  value={`${totalQty} parts`}
                  readOnly
                  disabled
                />
              </Col>
              <Form.Label column sm="1">
                Add Part No. :
              </Form.Label>
              <Col sm="1">
                <div className="ml-1">
                  <Button variant="success" onClick={handleShowAdd}>
                    <FontAwesomeIcon icon={faFolderPlus} /> Add
                  </Button>
                </div>
              </Col>
            </Form.Group>
            <Table className="table table-bordered">
              <thead>
                <tr className="table table-hover">
                  <td>
                    <center>No</center>
                  </td>
                  <td>
                    <center>Bu Code</center>
                  </td>
                  <td>
                    <center>Bu Name</center>
                  </td>
                  <td>
                    <center>Part Number</center>
                  </td>
                  <td>
                    <center>Part Name</center>
                  </td>
                  <td>
                    <center>Price</center>
                  </td>
                  <td>
                    <center>Tanggal Input</center>
                  </td>
                  <td>
                    <center>Tanggal Update</center>
                  </td>
                  <td>
                    <center>Aksi</center>
                  </td>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((data, index) => (
                  <tr key={data.partnumber_id}>
                    <td>{index + 1}</td>
                    <td>{data.bu_code}</td>
                    <td>{data.bu_name}</td>
                    <td>{data.partnumber}</td>
                    <td>{data.partname}</td>
                    <td>{formatRupiah(data.price)}</td>
                    <td>{data.create_date}</td>
                    <td>{data.update_date}</td>
                    <td>
                      <div>
                        <center>
                          <div className="d-flex justify-content-center button-group">
                            <Button
                              variant="primary"
                              onClick={() => handleShowEdit(data.partnumber_id)}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleShowDelete(data.partnumber_id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} /> Remove
                            </Button>
                          </div>
                        </center>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal - Add Item */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddItem}>
            <Form.Group className="mb-3" controlId="partNumberAdd">
              <Form.Label>Part Number</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={partnumber}
                onChange={(e) => setPartNo(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="partNameAdd">
              <Form.Label>Part Name</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={partname}
                onChange={(e) => setPartName(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceAdd">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal - Edit */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group className="mb-3" controlId="partNumberEdit">
              <Form.Label>Part Number</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={partNumberEdit}
                onChange={(e) =>
                  setPartNumberEdit(e.target.value.toUpperCase())
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="partNameEdit">
              <Form.Label>Part Name</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={partNameEdit}
                onChange={(e) => setPartNameEdit(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceEdit">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MasterDetail;
