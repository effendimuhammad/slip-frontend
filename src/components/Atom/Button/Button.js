import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ type, onClick, children }) => (
  <button type={type} onClick={onClick} className="button">
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
