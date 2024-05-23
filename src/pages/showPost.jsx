import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Create a query to fetch posts from the "userposts" collection ordered by "createdAt" in descending order
    const postsQuery = query(
      collection(db, "userposts"),
      orderBy("createdAt", "desc")
    );

    // Listen for real-time updates
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    // Clean up the listener on component unmount
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

  return (
    <div className="w-full m-auto h-full min-h-screen">
      <div className="w-[60%] m-auto flex flex-col justify-center items-center">
        {posts.length > 0 ? (
          <div className="flex flex-col justify-start items-start text-white p-5 w-full">
            <h2 className="text-3xl font-bold mb-8">Top Questions</h2>
            <div className="flex flex-col w-full">
              {posts.map((post) => {
                const createdAt = formatDate(post.createdAt);

                return (
                  <Link to={`/Posts/${post.id}`} key={post.id}>
                    <div className="border border-slate-700 shadow-lg cursor-pointer p-5 w-full m-2">
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
          <h1 className="text-white text-md">
            Sorry, there are no posts found.
          </h1>
        )}
      </div>
    </div>
  );
};

export default ShowPosts;
