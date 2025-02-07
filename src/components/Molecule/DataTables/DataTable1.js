import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationTable from "../../Atom/Pagination/Pagination";

const DataTable = ({ data1 }) => {
  //pagination
  const [page, setPage] = useState(1);
  const dataPerPage = 5;
  const totalPage = Math.ceil(data1.length / dataPerPage);

  //modal-edit
  const [showEdit, setShowEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState("");
  const [nimEdit, setNimEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

  //modal-detail
  const [showDetail, setShowDetail] = useState(false);
  const [usernameDetail, setUsernameDetail] = useState("");
  const [nimDetail, setNimDetail] = useState("");
  const [emailDetail, setEmailDetail] = useState("");
  const [idDetail, setIdDetail] = useState("");

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (e) => {
    const id = e.target.id;
    if (id) {
      axios.get(`http://localhost:4100/users/${id}`).then((response) => {
        const data = response.data.data[0];
        setUsernameEdit(data.username);
        setNimEdit(data.nim);
        setEmailEdit(data.email);
        setIdEdit(id);
      });
    }
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameEdit,
      nim: nimEdit,
      email: emailEdit,
    };

    axios
      .patch(`http://localhost:4100/update/${idEdit}`, data)
      .then((res) => {
        alert("Saved!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    axios
      .delete(`http://localhost:4100/delete/${id}`)
      .then((res) => {
        alert("Deleted!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseDetail = () => setShowDetail(false);
  const handleDetail = (e) => {
    const id = e.target.id;
    if (id) {
      axios.get(`http://localhost:4100/users/${id}`).then((response) => {
        const data = response.data.data[0];
        setUsernameDetail(data.username);
        setNimDetail(data.nim);
        setEmailDetail(data.email);
        setIdDetail(id);
      });
    }
    setShowDetail(true);
  };

  // Get current data
  const indexOfLastData = page * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data1.slice(indexOfFirstData, indexOfLastData);

  console.log("data1", data1);

  return (
    <div>
      <Table className="table table-bordered">
        <thead>
          <tr className="table table-dark">
            <td>
              <center>No</center>
            </td>
            <td>
              <center>Username</center>
            </td>
            <td>
              <center>Nim</center>
            </td>
            <td>
              <center>Email</center>
            </td>
            <td>
              <center>Aksi</center>
            </td>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td>{indexOfFirstData + index + 1}</td>
              <td>{item.username}</td>
              <td>{item.nim}</td>
              <td>{item.email}</td>
              <td>
                <div>
                  <center>
                    <Link>
                      <Button
                        id={item.id}
                        variant="primary"
                        onClick={handleShowEdit}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      id={item.id}
                      variant="danger"
                      onClick={handleDelete}
                    >
                      Hapus
                    </Button>
                    <Button
                      id={item.id}
                      variant="success"
                      onClick={handleDetail}
                    >
                      Detail
                    </Button>
                  </center>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

      {/* Modal - Edit */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={usernameEdit}
                onChange={(e) => setUsernameEdit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>NIM</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={nimEdit}
                onChange={(e) => setNimEdit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal - Detail */}
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Information Detail</p>
          <p style={{ display: "none" }}>Id : {idDetail}</p>
          <p>Username : {usernameDetail}</p>
          <p>Nim : {nimDetail}</p>
          <p>Email : {emailDetail}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
