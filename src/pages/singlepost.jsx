import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "react-quill/dist/quill.snow.css"; // Import the full Quill CSS

const SinglePosts = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const [Posts, setPosts] = useState(null); // Initialize Posts state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const docRef = doc(db, "userposts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPosts(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching Posts:", error);
      }
    };

    fetchPosts();
  }, [id]); // Fetch Posts data when the id parameter changes

  return (
    <div className="p-5 text-white w-full m-auto lg:w-[50%] min-h-screen flex flex-col justify-center items-center">
      {Posts ? (
        <div>
          <div className="p-2 w-full flex justify-start items-start gap-2 capitalize">
            <p>Owner: </p>
            <p dangerouslySetInnerHTML={{ __html: Posts.PostsOwner }} />
          </div>
          <div
            className="mb-5 text-sm font-rubik font-bold p-2 text-start w-full"
            dangerouslySetInnerHTML={{ __html: Posts.PostsName }}
          />
          <div className="w-full h-[2px] bg-gradient-to-t from-transparent via-slate-700 mt-5 mb-5 to-transparent"></div>
          <div
            className="ql-editor text-white p-5 overflow-scroll" // Added ql-editor class
            dangerouslySetInnerHTML={{ __html: Posts.PostsDescription }}
          />
        </div>
      ) : (
        <h1 className="text-white">Loading...</h1>
      )}
    </div>
  );
};

export default SinglePosts;
