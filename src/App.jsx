import { useState } from "react";
import "./App.css";
import "highlight.js";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";
import VerificationPage from "./pages/verificationPage";
import CreatePost from "./pages/CreatePost";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SinglePosts from "./pages/singlepost";
import "react-quill/dist/quill.snow.css";
import ShowPosts from "./pages/showPost";
import Question from "./pages/Question";
import UserDashboard from "./User/userDashboard";
import MyPosts from "./User/MyPosts";
import Footer from "./pages/Footer";

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-[#06131a]">
      <Nav />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:id" element={<SinglePosts />} />
        <Route path="/question" element={<Question />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/userposts" element={<MyPosts />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
