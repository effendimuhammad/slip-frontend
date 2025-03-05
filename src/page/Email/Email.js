import React, { useState } from "react";
import axios from "axios";

function Email() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = `Semangat Pagi Bpk FIRDAUS RIZAL,
    
    Berikut adalah data Weekly Summary Control Unconfirmation Leader dan Foreman dari tanggal Monday, 24 February 2025 sampai Sunday, 02 March 2025
    
    NO\tBU NAME\tLINE NAME\tNAME\tJOB FUNCTION\tGROUP\tDETAIL
    1\t7142 - ACGS\t\tFOREMAN\tB\tClick Here
    2\t7142 - ACGS\tSTATOR 3 ASSY\t940824 - HERRY SUBAGIO\tLEADER\tB\tClick Here
    
    Best Regards,
    Komite Digitalization DNIA
    
    This message was automatically created by the system
    Send On: Sunday, 02 March 2025 20:35:01`;

    axios
      .post("http://localhost:3001/set-email-data", { ...emailData, content })
      .then((response) => {
        alert("Email data set successfully");
      })
      .catch((error) => {
        alert("Error setting email data");
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="to"
        placeholder="Recipient"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        required
      />
      <button type="submit">Set Email Data</button>
    </form>
  );
}

export default Email;
