import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Editor from "../Editor/Markdown"; // Import the Editor component
import { useAuth } from "../contexts/AuthContext";

const CreatePost = () => {
  const [PostsName, setPostsName] = useState("");
  const [editorData, setEditorData] = useState("");
  const [PostsLink1, setPostsLink1] = useState("");
  const [PostsLink2, setPostsLink2] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const firestore = getFirestore();
    const storage = getStorage();

    try {
      if (!editorData.trim()) {
        throw new Error("Please provide a Posts description.");
      }

      // Fetch the current user's data from "userdb" collection
      const userDoc = await getDoc(doc(firestore, "userdb", currentUser.uid));
      if (!userDoc.exists()) {
        throw new Error("User does not exist in the userdb collection.");
      }

      const userData = userDoc.data();

      const PostsData = {
        PostsName: PostsName,
        PostsDescription: editorData,
        PostsLink1: PostsLink1,
        PostsLink2: PostsLink2,
        PostsOwner: userData.Name,
        ownerProfileImage: userData.profileImage,
        createdAt: new Date(),
      };

      await addDoc(collection(firestore, "userposts"), PostsData);
      console.log("Posts data uploaded successfully!");

      setPostsName("");
      setEditorData("");
      setPostsLink1("");
      setPostsLink2("");
    } catch (error) {
      console.error("Error uploading Posts data:", error);
    }
  };

  return (
    <div className="w-full lg:w-[60%] m-auto text-white p-5 flex flex-col">
      <div className="w-full flex flex-col justify-center items-center p-2 border border-slate-800">
        <h2 className="text-2xl font-bold mb-4">What on Your Mind?</h2>
        <code className="text-sm text-white">Ask a Question</code>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <div className="w-full flex flex-col gap-2">
            <label className="block mb-1 text-sm font-rubik">Title:</label>
            <input
              type="text"
              value={PostsName}
              onChange={(e) => setPostsName(e.target.value)}
              className="w-full border border-slate-700 rounded px-3 py-2 bg-transparent text-white outline-none focus:border-blue-600"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="block mb-1 bg-transparent text-sm font-rubik">
              Question:
            </label>
            <Editor value={editorData} onChange={setEditorData} />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
