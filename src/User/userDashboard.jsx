import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import UserImage from "./userImage";
import Settings from "./Setting";
import UserInfo from "./userInfo";
import React, { useState, useEffect, useRef } from "react";
import { uploadProfilePicture } from "./uploadProfilePicture";
import { AiOutlineCamera, AiOutlineEdit, AiOutlineMenu } from "react-icons/ai"; // Import AiOutlineMenu
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "../assets/profile-user.png";
import MyPosts from "./MyPosts";

const Userprofile = () => {
  const Navigation = useNavigate();
  const {
    currentUser,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    logout,
  } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("userinfo");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const userRef = doc(db, "userdb", currentUser.uid);
  const fileInputRef = useRef(null); // Ref for file input element
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newBios, setNewBios] = useState("");
  const [oldBios, setOldBios] = useState(""); // State to store user data
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingBios, setEditingBios] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // State to manage sidebar visibility
  const navigate = useNavigate();
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    // Redirect to login page if no user is logged in
    if (!currentUser) {
      // Navigation('/login');
    }
  }, [currentUser, Navigation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userdb", currentUser.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userDataFromFirestore = docSnapshot.data();
          setUserData(userDataFromFirestore);
        } else {
          // Handle if user document not found
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

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
      setError("Failed to update bios.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="flex w-[60%] m-auto justify-start border border-slate-800 items-start min-h-screen">
      {/* Side bar */}
      {showSidebar && (
        <div className="w-1/5 text-white p-5 ">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer relative"
            onClick={handleImageClick}
          >
            {userData && (
              <div className="flex flex-col items-center">
                {userData.profileImage && (
                  <div className="relative">
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handlePictureChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <div className="absolute bottom-5 right-5 bg-white rounded-full p-1">
                      <AiOutlineCamera className="text-blue-500 w-6 h-6 cursor-pointer" />
                    </div>
                  </div>
                )}
                <h3 className="text-lg font-semibold">{userData.firstName}</h3>
                <p className="text-sm italic text-gray-400">{userData.bios}</p>
                <p className="text-sm text-gray-600 cursor-pointer">
                  {userData.email}
                </p>
              </div>
            )}
          </label>
          <div className="mt-5 flex flex-col gap-5 h-full">
            <button
              onClick={() => setActiveComponent("userinfo")}
              className="border border-slate-700 cursor-pointer p-2 rounded-lg"
            >
              View Profile
            </button>
            <button
              onClick={() => setActiveComponent("myposts")}
              className="border border-slate-700 cursor-pointer p-2 rounded-lg"
            >
              My Posts
            </button>
            <button
              onClick={() => setActiveComponent("settings")}
              className="border border-slate-700 cursor-pointer p-2 rounded-lg"
            >
              Settings
            </button>
            <button
              className="border border-slate-700 cursor-pointer p-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {/* Main content */}
      <div className="w-4/5  h-full">
        {userData && (
          <React.Fragment>
            {activeComponent === "userinfo" && <UserInfo />}
            {activeComponent === "settings" && <Settings />}
            {activeComponent === "myposts" && <MyPosts />}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
