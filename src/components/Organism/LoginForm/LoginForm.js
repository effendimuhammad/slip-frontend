import React, { useState } from "react";
import FormField from "../../Molecule/FormField/FormField.js";
import Button from "../../Atom/Button/Button.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nim: nim, password: password };
    axios
      .post("http://localhost:4100/auth/login", data)
      .then((response) => {
        const token = response.data.token;
        const user = response.data.user;
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));

        console.log("token", token);
        console.log("user", user);
        console.log("nim", nim);

        navigate("/home");

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Login berhasil!",
            text: "Anda telah berhasil login.",
            timer: 500,
            showConfirmButton: false,
          }).then(() => {
            navigate("/home");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login gagal!",
            text: "Coba lagi.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Gagal. Terjadi kesalahan pada server!",
          text: "Login gagal. Terjadi kesalahan pada server.",
        });
        console.log(error);
        setError("Login Gagal. Terjadi kesalahan pada server.");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <FormField
            label="NIM"
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Enter your NIM"
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
          <Button type="submit">Login</Button>
        </div>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
