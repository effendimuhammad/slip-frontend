import React, { useState } from "react";
import FormField from "../../Molecule/FormField/FormField.js";
import Button from "../../Atom/Button/Button.js";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!username || !nim || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    const registerData = { username, nim, email, password };
    axios
      .post("http://localhost:4100/register", registerData)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Register berhasil!",
            text: "Anda telah berhasil Register.",
            timer: 500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/register";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Register gagal!",
            text: "Coba lagi.",
          });
        }
      })
      .catch((error) => {
        window.alert("Register Gagal. Terjadi kesalahan pada server.");
        console.log(error);
        setError("Login Register. Terjadi kesalahan pada server.");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <FormField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-field">
          <FormField
            label="Nim"
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Enter your nim"
          />
        </div>
        <div className="form-field">
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-field">
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="button-container">
          <Button type="submit">Register</Button>
        </div>
      </form>
      <div className="login-link">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
