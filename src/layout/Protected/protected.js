import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected(props) {
  //   const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  const { children } = props;
  if (token) {
    return children ? children : <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default Protected;
