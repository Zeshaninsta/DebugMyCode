import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { FiSearch } from "react-icons/fi";
import "./showpost.css";
import { useAuth } from "../contexts/AuthContext";
import PageTransition from "./PageTransition";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const Navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      Navigate("/login");
    }
  }, []);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "userposts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate();
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", "")
      .replace(/ /g, "-");
    const formattedTime = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toUpperCase();
    return `${formattedDate}, ${formattedTime}`;
  };

  const filteredPosts = posts.filter((post) => {
    const searchTermMatch = post.PostsName.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const tagMatch = selectedTags.every(
      (tag) => post.tags && post.tags.includes(tag)
    );
    return searchTermMatch && tagMatch;
  });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([tag]);
    }
    setSearchTerm(""); // Clear the search term as well
  };

  return (
    <PageTransition>
      <div className="w-full m-auto h-full min-h-screen">
        <div className="w-full lg:w-[60%] m-auto flex flex-col justify-center items-center px-2">
          <div className="w-full lg:w-[60%] mx-auto flex justify-center items-center gap-2 px-5 py-2 border border-slate-800 bg-slate-800 mt-5 text-white rounded-md">
            <input
              type="search"
              placeholder="Search posts..."
              className="w-full text-white font-rubik text-md flex justify-center items-center outline-none bg-transparent "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="cursor-pointer text-md" />
          </div>
          <div className="flex gap-2 text-xs lg:sm mt-4 w-full lg:w-[60%] overflow-x-scroll bg-slate-700 m-auto p-2 text-white ">
            {[
              "javascript",
              "react",
              "python",
              "java",
              "html",
              "Ruby",
              "C++",
              "C",
              "Nodejs",
            ].map((tag) => (
              <button
                key={tag}
                className={`tag-button ${
                  selectedTags.includes(tag) ? "tag-button-selected" : ""
                } bg-slate-800 hover:bg-slate-900 duration-500 px-5 py-2`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {currentPosts.length > 0 ? (
            <div className="flex flex-col justify-start items-start text-white py-5 px-2 w-full">
              <h2 className="text-3xl font-bold mb-8">Top Questions</h2>
              <div className="flex flex-col w-full ">
                <p className="bg-slate-800 w-full p-2 text-white">
                  <span className="text-green-500 p-2 cursor-pointer">
                    #{selectedTags.join(", ")}
                  </span>
                </p>
                {currentPosts.map((post) => {
                  const createdAt = formatDate(post.createdAt);

                  return (
                    <Link
                      to={`/posts/${post.id}`}
                      key={post.id}
                      className="w-full flex flex-col justify-center items-center"
                    >
                      <div className="border border-slate-700 w-full shadow-lg cursor-pointer p-2 w-full m-2">
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
                        </div>
                        <div
                          className="text-xl font-rubik font-bold"
                          dangerouslySetInnerHTML={{ __html: post.PostsName }}
                        />
                        <span className="text-xs text-gray-500 font-light font-rubik ">
                          {createdAt}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-white p-5 w-full">
              <h2 className="text-3xl font-bold mb-8">Top Questions</h2>
              <p className="bg-slate-800 w-full p-2 text-white">
                Sorry, posts with tag{" "}
                <span className="text-red-500 p-2 cursor-pointer">
                  #{selectedTags.join(", ")}
                </span>
                is not found.
              </p>
              <p>Here are all posts:</p>
              <div className="flex flex-col w-full">
                {posts.map((post) => {
                  const createdAt = formatDate(post.createdAt);

                  return (
                    <Link to={`/posts/${post.id}`} key={post.id}>
                      <div className="border border-slate-700 shadow-lg cursor-pointer p-5 w-full m-2">
                        <div className="flex items-center mb-2  ">
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
                        </div>
                        <div
                          className="text-xl font-rubik font-bold"
                          dangerouslySetInnerHTML={{ __html: post.PostsName }}
                        />
                        <span className="text-xs text-gray-500 font-light font-rubik ">
                          {createdAt}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <nav className="mt-6 w-full mb-5">
            <ul className="flex justify-between items-center w-full bg-slate-800 px-5 py-4">
              <li
                className={`${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-white"
                >
                  Previous
                </button>
              </li>
              <div className="flex justify-center items-center text-white gap-2">
                {Array.from(
                  { length: Math.ceil(filteredPosts.length / postsPerPage) },
                  (_, i) => (
                    <li key={i} className="ml-2">
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`${
                          currentPage === i + 1 ? "font-bold" : ""
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </div>
              <li
                className={`${
                  currentPage === Math.ceil(filteredPosts.length / postsPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredPosts.length / postsPerPage)
                  }
                  className="text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </PageTransition>
  );
};

export default ShowPosts;
