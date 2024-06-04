import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import "react-quill/dist/quill.snow.css"; // Import the full Quill CSS
import { useAuth } from "../contexts/AuthContext";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import PageTransition from "./PageTransition";

const SinglePosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [sidebarPosts, setSidebarPosts] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null); // State to hold current user's data
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "userposts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          setPost(postData);
          if (postData.answers) {
            setAnswers(postData.answers);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchSidebarPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "userposts"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredPosts = postsData.filter((post) => post.id !== id);
        setSidebarPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching sidebar posts:", error);
      }
    };

    fetchSidebarPosts();
  }, [id]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "userdb", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUserData(userData);
          } else {
            console.log("No such user document!");
          }
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, [currentUser]);

  const handleBack = () => {
    window.history.back();
  };

  const handleAnswerSubmit = async () => {
    try {
      if (answer.trim() !== "") {
        const postRef = doc(db, "userposts", id);
        const newAnswer = {
          answerText: answer,
          answeredAt: new Date(),
          userId: currentUser.uid,
          userName: currentUserData?.Name || "Unknown User", // Use current user's name from fetched data
          userProfile: currentUserData?.profileImage || "", // Use current user's profile image from fetched data
        };

        // Fetch the existing answers from Firestore
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const postData = postSnap.data();
          const currentAnswers = postData.answers || [];

          // Append the new answer to the existing answers
          const updatedAnswers = [...currentAnswers, newAnswer];

          // Update the post document with the updated answers array
          await setDoc(postRef, { answers: updatedAnswers }, { merge: true });

          // Update the answers state with the updated answers
          setAnswers(updatedAnswers);

          // Clear the answer input field
          setAnswer("");
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen z-10 ">
        <button
          onClick={handleBack}
          className="px-2 py-5 w-full lg:w-[70%] items-center gap-2 mx-auto mb-2 flex justify-start border-b border-slate-700 text-md font-rubik font-semibold text-gray-300 hover:text-white duration-200"
        >
          <IoMdArrowRoundBack className="text-white" />
          Back
        </button>
        <div className="flex justify-normal items-start mt-10 w-full lg:w-[70%] mx-auto relative z-10">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col justify-start p-5 items-start lg:w-[30%] m-auto min-h-screen border-r bg-[#07161d] border-white">
            <h2 className="text-white text-lg font-semibold mb-4">
              Latest Posts
            </h2>
            <ul className="text-white w-full relative overflow-hidden">
              <div className="w-[10px] h-[500px] absolute left-0 bg-[#03090c] top-0 rounded-full"></div>
              {sidebarPosts.map((post) => (
                <li
                  key={post.id}
                  className="mb-2 group hover:bg-[#0a202c] w-full flex flex-col justify-center items-start p-2 rounded-md cursor-pointer"
                >
                  <span className="w-[10px] h-[10px] bg-slate-700 rounded-full absolute left-0 group-hover:bg-green-500"></span>
                  <div
                    className="flex justify-center items-center  truncate"
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    <span className="text-red-500 m-2 group-[text]: group-hover:text-green-500">
                      {"[+]"}
                    </span>
                    {post.PostsName}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Left contents */}
          <div className="p-5 w-full text-white m-auto flex flex-col justify-start items-start  min-h-screen border-r border-white z-10">
            {post ? (
              <div className="w-full flex flex-col">
                <div className="flex items-center mb-2 ">
                  {post.ownerProfileImage ? (
                    <img
                      src={post.ownerProfileImage}
                      alt={post.ownerName}
                      className="w-6 h-6 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500" />
                  )}
                  <p className="text-white text-sm font-rubik font-light border-b border-yellow-600">
                    {post.PostsOwner || "Unknown User"}
                  </p>
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-800 px-2 py-1 text-xs font-rubik ml-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="mb-2 text-lg font-rubik font-bold p-2 text-start w-full"
                  dangerouslySetInnerHTML={{ __html: post.PostsName }}
                />
                <div className="w-full h-[2px] bg-gradient-to-t from-transparent via-slate-700 to-transparent"></div>
                <div
                  className="ql-editor text-white p-5 overflow-scroll bg-slate-800"
                  dangerouslySetInnerHTML={{ __html: post.PostsDescription }}
                />
                <div className="mt-8">
                  <h1 className="text-lg text-white mb-4">Answers</h1>
                  <ul>
                    {answers.map((ans, index) => (
                      <li key={index} className="text-white">
                        <div className="flex flex-col justify-start items-start gap-2 m-2">
                          <div className=" object-cover rounded-full text-sm flex gap-2 justify-center items-center">
                            <img
                              src={ans.userProfile}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <p className="border-b border-yellow-600">
                              {ans.userName}
                            </p>
                          </div>
                          <p className="bg-[#0a202c] w-full p-2 text-sm rounded-md">
                            {ans.answerText}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h1 className="text-lg text-white mb-4">Your Answer</h1>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded-md text-white bg-[#0a202c] resize-none focus:outline-none"
                    placeholder="Type your answer here..."
                  ></textarea>
                  <button
                    onClick={handleAnswerSubmit}
                    className="flex justify-center items-center mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 text-2xl text-white mx-auto">
                Loading
                <FaArrowsRotate className="animate-spin text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SinglePosts;
