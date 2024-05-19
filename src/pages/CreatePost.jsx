import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Editor from "../Editor/Markdown"; // Import the Editor component
import hljs from "highlight.js"; // Import highlight.js

const CreatePost = () => {
  const [PostsName, setPostsName] = useState("");
  const [editorData, setEditorData] = useState("");
  const [PostsLink1, setPostsLink1] = useState("");
  const [PostsLink2, setPostsLink2] = useState("");
  const [PostsImage, setPostsImage] = useState(null);
  const [Postsowner, setPostsOwner] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storage = getStorage();

    try {
      //   if (!PostsImage) {
      //     throw new Error("Please select a Posts image.");
      //   }

      if (!editorData.trim()) {
        throw new Error("Please provide a Posts description.");
      }

      //   const storageRef = ref(storage, `userpost_images/${PostsImage.name}`);
      //   await uploadBytes(storageRef, PostsImage);

      //   const downloadURL = await getDownloadURL(storageRef);

      const firestore = getFirestore();
      const PostsData = {
        PostsName: PostsName,
        PostsDescription: editorData,
        PostsLink1: PostsLink1,
        PostsLink2: PostsLink2,
        // PostsImage: downloadURL,
        PostsOwner: Postsowner,
      };

      await addDoc(collection(firestore, "userposts"), PostsData);
      console.log("Posts data uploaded successfully!");

      setPostsName("");
      setEditorData("");
      setPostsLink1("");
      setPostsLink2("");
      //   setPostsImage(null);
      setPostsOwner("");
    } catch (error) {
      console.error("Error uploading Posts data:", error);
    }
  };

  return (
    <div className="w-full lg:w-[60%] m-auto text-white p-5 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center p-2 border border-slate-800">
        <h2 className="text-2xl font-bold mb-4">What on Your Mind?</h2>
        <code className="text-sm text-white">Ask a Question</code>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center"
        >
          {/* <div className="w-full">
          <label className="block mb-1"> Posts Owner</label >
          <input
            type="text"
            value={Postsowner}
            readOnly
            onChange={(e) => setPostsOwner(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent text-white outline-none"
          />
        </div> */}
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
          {/* <div className="w-full">
          <label className="block mb-1">Posts Image:</label>
          <input
            type="file"
            onChange={(e) => setPostsImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent text-white "
          />
        </div> */}
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
