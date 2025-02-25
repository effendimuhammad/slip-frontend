import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "./DetailSlip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";

const DetailModal = ({ show, handleClose, detailData, bu_code }) => {
  const [showDetailSlip, setShowDetailSlip] = useState(false);
  const [formData, setFormData] = useState(null);
  const [localDetailData, setLocalDetailData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Ensure total_price is a number
    const formattedData = (detailData || []).map((item) => ({
      ...item,
      price: formatRupiah(item.price),
      total_price: item.quantity * item.price,
    }));
    setLocalDetailData(formattedData);
  }, [detailData]);

  const formatRupiah = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

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

  const handleShowDetailSlip = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4100/api/slip/getUpdateSlip/${id}`
      );
      setFormData(response.data.data[0]);
      setShowDetailSlip(true);
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }
  };

  const handleCloseDetailSlip = () => setShowDetailSlip(false);

  const handleInputChange = (eventOrOption) => {
    if (eventOrOption.target) {
      const { name, value } = eventOrOption.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        partNumber: eventOrOption.value,
        partName: eventOrOption.partName,
        price: eventOrOption.price,
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Calculate total_price before sending the request
      const updatedFormData = {
        ...formData,
        total_price: formData.quantity * formData.price,
      };
      await axios.patch(
        `http://localhost:4100/api/slip/update/${formData.id}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowDetailSlip(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Changes have been saved successfully!",
      });

      // Update the localDetailData state with the new data
      setLocalDetailData((prevData) =>
        prevData.map((item) =>
          item.id === updatedFormData.id ? updatedFormData : item
        )
      );
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleShowDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:4100/api/slip/deleteSlip/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Data deleted successfully");
          setLocalDetailData(localDetailData.filter((item) => item.id !== id));
        } else {
          alert("Failed to delete data");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("An error occurred while deleting data");
      }
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>
              Kode Slip -{" "}
              {localDetailData.length > 0 && localDetailData[0].kode_slip}
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          {localDetailData.length > 0 && (
            <Table className="table table-bordered table-responsive">
              <thead>
                <tr>
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
                    <center>Action</center>
                  </td>
                </tr>
              </thead>
              <tbody>
                {localDetailData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.partNumber}</td>
                    <td>{item.partName}</td>
                    <td>{item.quantity}</td>
                    <td>{formatRupiah(item.price)}</td>
                    <td>{formatRupiah(item.total_price)}</td>
                    <td>
                      <div>
                        <center>
                          <div className="d-flex justify-content-center button-group">
                            <Button
                              variant="primary"
                              onClick={() => handleShowDetailSlip(item.id)}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleShowDelete(item.id)}
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
          )}

          <div>
            <p>
              <strong>
                Grand Total:{" "}
                {localDetailData.length > 0 &&
                  formatRupiah(
                    localDetailData.reduce(
                      (sum, item) => sum + item.total_price,
                      0
                    )
                  )}
              </strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailSlip} onHide={handleCloseDetailSlip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slip Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData && (
            <Form>
              <Form.Group className="mb-3" controlId="formPartNumber">
                <Form.Label>Part Number</Form.Label>
                <Select
                  name="partNumber"
                  value={options.find(
                    (option) => option.value === formData.partNumber
                  )}
                  onChange={handleInputChange}
                  options={options}
                  placeholder="-- Pilih Part Number --"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPartName">
                <Form.Label>Part Name</Form.Label>
                <Form.Control
                  type="text"
                  name="partName"
                  value={formData.partName}
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailSlip}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailModal;
