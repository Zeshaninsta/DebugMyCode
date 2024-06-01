import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust the import path to your firebase config
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      if (currentUser) {
        try {
          // Fetch user data
          const userRef = doc(db, "userdb", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name);

            // Fetch user posts where PostsOwner matches the user's name
            const postsQuery = query(
              collection(db, "userposts"),
              where("PostsOwner", "==", userData.Name)
            );

            const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
              const userPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setPosts(userPosts);
              setLoading(false);
            });

            // Clean up the subscription on unmount
            return () => unsubscribe();
          } else {
            toast.error("User data not found");
            setLoading(false);
          }
        } catch (error) {
          toast.error(`Error fetching user data or posts: ${error.message}`);
          setLoading(false);
        }
      }
    };

    fetchUserDataAndPosts();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">My Posts</h2>
      {userName && (
        <div className="mb-4 p-4 border border-slate-700 shadow-lg w-full">
          <h3 className="text-xl font-semibold text-white">User Information</h3>
          <p>
            <strong>Name:</strong> {userName}
          </p>
        </div>
      )}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="flex flex-col w-full">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div className="border border-slate-700 shadow-lg cursor-pointer p-5 w-full m-2">
                <div className="flex items-center mb-2">
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
                  className="text-xl font-rubik font-bold text-white"
                  dangerouslySetInnerHTML={{ __html: post.PostsName }}
                />
                <span className="text-xs text-gray-500 font-light font-rubik ">
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
