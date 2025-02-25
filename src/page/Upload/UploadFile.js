import React, { useState, useEffect } from "react";
import Navbar from "../../components/Atom/Navbar/Navbar.js";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [bu_code, setBuCode] = useState("");
  const [bu_name, setBuName] = useState("");
  const [files, setFiles] = useState([]);

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    if (
      uploaded &&
      (uploaded.type === "application/pdf" ||
        uploaded.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        uploaded.type === "application/vnd.ms-excel" ||
        uploaded.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        uploaded.type === "application/vnd.ms-powerpoint" ||
        uploaded.type.startsWith("image/"))
    ) {
      setFile(uploaded);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid file (PDF, Excel, PowerPoint, or image).",
      });
    }
  }
  function handleSave() {
    if (file) {
      let formData = new FormData();
      formData.append("bu_code", bu_code);
      formData.append("bu_name", bu_name);
      formData.append("file", file);

      axios
        .post("http://localhost:4100/upload/create", formData)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "File uploaded successfully!",
            }).then(() => {
              window.location.href = "/upload";
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to upload file. Please try again.",
            });
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please upload a file first.",
      });
    }
  }

  const loadFiles = async () => {
    try {
      const response = await axios.get("http://localhost:4100/file/files");
      console.log("response", response);

      setFiles(response.data);
    } catch (error) {
      console.error("Gagal mendapatkan daftar file.", error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <Container fluid className="mt-4">
        <Navbar />
        <Col md={4}>
          <h3 className="text-modify">- TRIAL UPLOAD -</h3>
        </Col>
        <Row className="justify-content-center">
          <Col md={6} lg={2}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="mb-">Upload File</Card.Title>
                <Card.Text>
                  <Form className="my-4">
                    <Form.Group controlId="formBuCode" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={bu_code}
                        onChange={(e) =>
                          setBuCode(e.target.value.toUpperCase())
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBuName" className="mb-3">
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        value={bu_name}
                        onChange={(e) =>
                          setBuName(e.target.value.toUpperCase())
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload file here</Form.Label>
                      <Form.Control type="file" onChange={handleUploadChange} />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="w-80"
                      onClick={handleSave}
                    >
                      Save my file
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={10}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="mb-3">Files</Card.Title>
                <Card.Text>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Product</th>
                        <th scope="col">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.length === 0 ? (
                        <tr>
                          <td colSpan="4">No data</td>
                        </tr>
                      ) : (
                        files.map((file) => (
                          <tr key={file.id}>
                            <td>{file.id}</td>
                            <td>{file.bu_code}</td>
                            <td>{file.bu_name}</td>
                            <td>
                              {file.file.endsWith(".pdf") ? (
                                <a href={file.file} download>
                                  <FontAwesomeIcon icon={faFilePdf} /> Download
                                  PDF
                                </a>
                              ) : file.file.endsWith(".xlsx") ? (
                                <a href={file.file} download>
                                  <FontAwesomeIcon icon={faFileExcel} />{" "}
                                  Download Excel
                                </a>
                              ) : file.file.endsWith(".ppt") ||
                                file.file.endsWith(".pptx") ? (
                                <a href={file.file} download>
                                  <FontAwesomeIcon icon={faFilePowerpoint} />{" "}
                                  Download PowerPoint
                                </a>
                              ) : (
                                <img
                                  src={file.file}
                                  alt="about"
                                  style={{ width: "10%" }}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {/* {excelData.length > 0 && (
                    <div>
                      <h3>Excel Data</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            {excelData[0].map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {excelData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
                  {/* </div>
                  )} */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UploadFile;
