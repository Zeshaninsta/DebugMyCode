import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";

const CreatePost = () => {
  const [PostsName, setPostsName] = useState("");
  const [editorData, setEditorData] = useState("");
  const [PostsLink1, setPostsLink1] = useState("");
  const [PostsLink2, setPostsLink2] = useState("");
  const [tags, setTags] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
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
        tags: tags, // Keep tags as an array
      };

      await addDoc(collection(firestore, "userposts"), PostsData);
      console.log("Posts data uploaded successfully!");

      setPostsName("");
      setEditorData("");
      setPostsLink1("");
      setPostsLink2("");
      setTags([]); // Clear tags after posting
    } catch (error) {
      console.error("Error uploading Posts data:", error);
    }
  };

  // Function to handle adding tags
  const handleAddTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  return (
    <div className="w-full lg:w-[60%] m-auto text-white p-5 flex flex-col">
      <div className="w-full flex flex-col justify-center items-center p-2 border border-slate-800">
        <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2 text-white cursor-pointer">
          What's in Your Mind <BsFillQuestionCircleFill />
        </h2>
        <code className="text-sm text-white flex justify-center items-center gap-2 cursor-pointer">
          Ask a Question <RiQuestionAnswerLine />{" "}
        </code>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center w-full lg:w-[60%] m-auto"
        >
          <div className="w-full flex flex-col gap-2">
            <label className="mb-1 text-sm font-rubik flex justify-start items-center gap-1 text-white">
              <PiChatCenteredTextFill /> Title:
            </label>
            <input
              type="text"
              value={PostsName}
              onChange={(e) => setPostsName(e.target.value)}
              className="w-full border border-slate-700 rounded px-3 py-2 bg-transparent text-white outline-none focus:border-blue-600"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="flex justify-start items-center gap-1 text-white mb-1 bg-transparent text-sm font-rubik">
              <BsQuestionDiamondFill />
              Question:
            </label>
            <input
              type="text"
              value={editorData}
              onChange={(e) => setEditorData(e.target.value)}
              className="w-full outline-none border border-slate-700 focus:border-blue-400 text-sm text-white bg-transparent p-2"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="flex justify-start items-center gap-1 text-white mb-1 bg-transparent text-sm font-rubik">
              {" "}
              <AiFillTags />
              Tags:
            </label>
            <input
              value={tags.map((tag) => `#${tag}`).join(" ")}
              onChange={() => {}} // Readonly input for displaying tags
              className="w-full outline-none  text-sm text-white bg-transparent p-2"
            />
            <div className="flex text-xs lg:text-sm cursor-pointer flex-wrap gap-2 mt-2">
              {[
                "javascript",
                "react",
                "python",
                "java",
                "html",
                "C++",
                "C",
                "Ruby",
                "Nodejs",
              ].map((tag) => (
                <span
                  key={tag}
                  className="tag-button bg-slate-800 hover:bg-slate-900 duration-500 px-5 py-2"
                  onClick={() => handleAddTag(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
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
