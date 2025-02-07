import React, { useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const DataTable = ({ data }) => {
  //modal-create
  const [showCreate, setShowCreate] = useState(false);
  const [usernameCreate, setUsernameCreate] = useState("");
  const [nimCreate, setNimCreate] = useState("");
  const [emailCreate, setEmailCreate] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");

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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //hitung-total-halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //menghitung data yang akan ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (e) => {
    const id = e.target.id;
    console.log(id);
    if (id) {
      axios.get(`http://localhost:4100/users/${id}`).then((response) => {
        const data = response.data.data[0];
        setUsernameEdit(data.username);
        setNimEdit(data.nim);
        setEmailEdit(data.email);
        setIdEdit(id);
        console.log(data);
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
    console.log("data update", data);

    axios
      .patch(`http://localhost:4100/update/${idEdit}`, data)
      .then((res) => {
        alert("Saved!");
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const addNewUser = async () => {
    try {
      const dataUser = {
        username: usernameCreate,
        nim: nimCreate,
        password: passwordCreate,
        email: emailCreate,
      };

      const res = await axios.post("http://localhost:4100/create", dataUser);
      console.log("Response from server:", res.data);
      alert("Saved!");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to save!");
    }
  };
  const handleSubmitCreateUser = (e) => {
    e.preventDefault();
    addNewUser();
    handleCloseCreate();
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    axios
      .delete(`http://localhost:4100/delete/${id}`)
      .then((res) => {
        alert("Deleted!");
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDetail = (e) => {
    const id = e.target.id;
    console.log(id);
    if (id) {
      axios.get(`http://localhost:4100/users/${id}`).then((response) => {
        const data = response.data.data[0];
        setUsernameDetail(data.username);
        setNimDetail(data.nim);
        setEmailDetail(data.email);
        setIdDetail(id);
        console.log(data);
      });
    }
    setShowDetail(true);
  };

  const handleCloseDetail = () => setShowDetail(false);

  return (
    <div>
      <div className="card-title">
        <Button variant="primary" onClick={handleShowCreate}>
          Create
        </Button>
      </div>
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
              <td>{startIndex + index + 1}</td>
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
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>

        {/* Modal - Create */}
        <Modal show={showCreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={usernameCreate}
                  onChange={(e) => setUsernameCreate(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nim</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={nimCreate}
                  onChange={(e) => setNimCreate(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  size="lg"
                  value={passwordCreate}
                  onChange={(e) => setPasswordCreate(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={emailCreate}
                  onChange={(e) => setEmailCreate(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitCreateUser}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal - Edit */}
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Menu Baru</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama Menu</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={usernameEdit}
                  onChange={(e) => setUsernameEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Jenis Menu</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={nimEdit}
                  onChange={(e) => setNimEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Harga</Form.Label>
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
    </div>
  );
};

export default DataTable;
