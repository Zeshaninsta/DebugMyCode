import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import { uploadProfilePicture } from "./uploadProfilePicture";
import { AiOutlineCamera, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const userRef = doc(db, "userdb", currentUser.uid);
  const fileInputRef = useRef(null); // Ref for file input element
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newBios, setNewBios] = useState("");
  const [oldBios, setOldBios] = useState("");
  const [editingBios, setEditingBios] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userDataFromFirestore = userSnap.data();
            setUserData(userDataFromFirestore);
            setOldBios(userDataFromFirestore.bios || "");
          } else {
            toast.error("User Document not found");
          }
        } catch (error) {
          toast.error("Error fetching user data:", error.message);
        }
      }
    };

    fetchUserData();
  }, [currentUser, userRef]);

  const handleSaveBios = async () => {
    try {
      await setDoc(userRef, { bios: newBios }, { merge: true });
      toast.success("Bios Updated Successfully");
      setEditingBios(false);
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      toast.error("Failed to Update bios");
    }
  };

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
      toast.success("Profile picture updated successfully");
      setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
    } catch (error) {
      toast.error("Failed to update profile picture.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center border-l border-gray-300">
      <div className="w-full flex flex-col justify-center items-center ">
        {userData && (
          <div
            className="flex items-center justify-center w-[95%] flex-col p-5"
            style={{
              backgroundImage: `url(${userData.profileImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="relative shadow-md rounded-full"
              onClick={handleImageClick}
            >
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full cursor-pointer"
              />
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handlePictureChange}
                ref={fileInputRef} // Assign the ref to the file input
                className="hidden"
              />
              <div className="absolute bottom-5 right-5 bg-white rounded-full p-1">
                <AiOutlineCamera className="text-blue-500 w-6 h-6 cursor-pointer" />
              </div>
            </div>

            <div className="mt-5 flex items-center text-white w-full">
              {!editingBios ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="flex justify-center items-center gap-1 bg-white w-full rounded-full p-2">
                    <p className="text-md  text-gray-900 ">
                      {userData ? userData.bios : ""}
                    </p>
                    <button
                      onClick={() => setEditingBios(true)}
                      className="ml-2 text-blue-500"
                    >
                      <AiOutlineEdit className="p-2 w-10 h-10 rounded-full bg-black text-white" />
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
          </div>
        )}
      </div>
      <div className="flex-grow h-full m-auto w-[95%] mt-10 ">
        {userData && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="border p-4">
              <p className="font-semibold text-gray-600">First Name:</p>
              <p className="text-white">{userData.Name}</p>
            </div>
            {/* <div className="border p-4">
              <p className="font-semibold text-gray-600">Last Name:</p>
              <p>{userData.lastName}</p>
            </div> */}
            <div className="border p-4">
              <p className="font-semibold text-gray-600">Email:</p>
              <p className="text-white">{userData.email}</p>
            </div>
            <div className="border p-4">
              <p className="font-semibold text-gray-600">Date of Birth:</p>
              <p className="text-white">{userData.dateOfBirth}</p>
            </div>
            <div className="border p-4">
              <p className="font-semibold text-gray-600">Gender:</p>
              <p className="text-white">{userData.gender}</p>
            </div>
            {/* <div className="border p-4">
              <p className="font-semibold text-gray-600">Role:</p>
              <p className="text-white">{userData.role}</p>
            </div> */}
            {/* <div className="border p-4">
              <p className="font-semibold text-gray-600">Joined at:</p>
              <p>{userData.createdAt}</p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
