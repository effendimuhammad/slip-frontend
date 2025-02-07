import React from "react";
import PropTypes from "prop-types";
import Label from "../../Atom/Label/Label.js";
import Input from "../../Atom/Input/Input.js";

const FormField = ({ label, type, value, onChange, placeholder }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormField;
