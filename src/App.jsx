import React from "react";
import "./App.css";
import "highlight.js";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";
import VerificationPage from "./pages/verificationPage";
import CreatePost from "./pages/CreatePost";
import { Routes, Route, useLocation } from "react-router-dom";
import SinglePosts from "./pages/singlepost";
import "react-quill/dist/quill.snow.css";

const App = () => {
  const location = useLocation();
  return (
    <div className="bg-[#06131a]">
      <Nav />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:id" element={<SinglePosts />} />
      </Routes>
    </div>
  );
};

export default App;
