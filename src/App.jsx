import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";
import VerificationPage from "./pages/verificationPage";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-[#06131a]">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerificationPage />} />
      </Routes>
    </div>
  );
};

export default App;
