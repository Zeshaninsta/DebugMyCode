import React from "react";
import CreatePost from "./CreatePost";
import ShowPosts from "./showPost";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Question = () => {
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  if (!currentUser) {
    Navigate("/login");
  }
  return (
    <div className="min-h-screen w-full">
      <CreatePost />
      <ShowPosts />
    </div>
  );
};

export default Question;
