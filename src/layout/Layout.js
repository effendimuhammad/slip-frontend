import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../page/Home/Home";
import About from "../page/About/About";
import Contact from "../page/Contact/Contact";
import DataUser from "../page/DataUser/DataUser";
import RegisterForm from "../components/Organism/RegisterForm/RegisterForm";
import Protected from "./Protected/protected";
import LoginForm from "../components/Organism/LoginForm/LoginForm";
import InputSlip from "../page/InputSlip/InputSlip";
import MasterGeneral from "../page/Master/MasterGeneral";
import MasterDetail from "../page/Master/MasterDetail";
import BuCard from "../page/BuCard/BuCard";
import SummaryGeneral from "../page/Summary/SummaryGeneral";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route element={<Protected />}>
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<DataUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/input/:bu_code" element={<InputSlip />} />

        <Route path="/bucard" element={<BuCard />} />

        <Route path="/master" element={<MasterGeneral />} />
        <Route path="/masterDetail/:bu_code" element={<MasterDetail />} />
        <Route path="/summary" element={<SummaryGeneral />} />
      </Route>
    </Routes>
  );
}

export default App;
