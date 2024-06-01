import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { uploadProfilePicture } from "./uploadProfilePicture";
import { AiOutlineCamera, AiOutlineEdit } from "react-icons/ai";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "../assets/profile-user.png";

const UserImageProfile = () => {
  const { currentUser } = useAuth();
  const userRef = doc(db, "userdb", currentUser.uid);
  const fileInputRef = useRef(null); // Ref for file input element
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newBios, setNewBios] = useState("");
  const [oldBios, setOldBios] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingBios, setEditingBios] = useState(false);
  const navigate = useNavigate(); // Corrected variable name to follow convention

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        // Check if currentUser exists
        try {
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userDataFromFirestore = userSnapshot.data();
            setUserData(userDataFromFirestore);
            setOldBios(userDataFromFirestore.bios || ""); // Set the bios value from database
          } else {
            navigate("/login"); // Corrected function name
            setError("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [currentUser, userRef, navigate]); // Added missing dependencies

  const handleImageClick = () => {
    // Trigger file input when the image is clicked
    fileInputRef.current.click();
  };

  const handlePictureChange = async (e) => {
    // Set the new profile picture when a file is selected
    setNewProfilePicture(e.target.files[0]);
    await handlePictureUpload(e.target.files[0]);
  };

  const handlePictureUpload = async (file) => {
    try {
      await uploadProfilePicture(currentUser, file);
      setSuccessMessage("Profile picture updated successfully.");
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      setError("Failed to update profile picture.");
    }
  };

  const handleSaveBios = async () => {
    try {
      await setDoc(userRef, { bios: newBios }, { merge: true });
      setSuccessMessage("Bios updated successfully.");
      setEditingBios(false);
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      console.log(error);
      setError("Failed to update bios.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-[80%] flex justify-center items-center gap-5 flex-col p-5 mt-10">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer relative"
          onClick={handleImageClick}
        >
          <img
            src={
              userData
                ? userData.profileImage || defaultUserIcon
                : defaultUserIcon
            }
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border border-gray-200"
          />
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureChange}
            ref={fileInputRef} // Assign the ref to the file input
            className="hidden"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <AiOutlineCamera className="text-blue-500 w-6 h-6 cursor-pointer" />
          </div>
        </label>
        <div className="mt-5 flex items-center text-white">
          {!editingBios ? (
            <div className="flex flex-col justify-center items-center">
              <p>Bio</p>
              <div className="flex justify-center items-center gap-1">
                <p className="text-sm italic text-gray-400">
                  {userData ? userData.bios : ""}
                </p>
                <button
                  onClick={() => setEditingBios(true)}
                  className="ml-2 text-blue-500"
                >
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around items-center  m-auto gap-2">
              <input
                type="text"
                className="border p-2 border-gray-300 text-black rounded mt-2 resize-none"
                value={newBios}
                placeholder={oldBios}
                onChange={(e) => setNewBios(e.target.value)}
              />
              <button
                onClick={handleSaveBios}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default UserImageProfile;
