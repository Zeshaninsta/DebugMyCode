import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import UserImage from "./userImage";
import Settings from "./Setting";
import UserInfo from "./userInfo";
import MyPosts from "./MyPosts";
import { AiOutlineCamera, AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import defaultUserIcon from "../assets/profile-user.png";
import { uploadProfilePicture } from "./uploadProfilePicture";

const Userprofile = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("userinfo");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userdb", currentUser.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePictureChange = async (e) => {
    setNewProfilePicture(e.target.files[0]);
    await handlePictureUpload(e.target.files[0]);
  };

  const handlePictureUpload = async (file) => {
    try {
      await uploadProfilePicture(currentUser, file);
      setSuccessMessage("Profile picture updated successfully.");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setError("Failed to update profile picture.");
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLinkClick = (component) => {
    setActiveComponent(component);
    setShowSidebar(false);
  };

  return (
    <div className="flex w-full lg:w-[60%] m-auto justify-start border border-slate-800 items-start min-h-screen relative">
      <button
        className="lg:hidden p-2 text-xl absolute top-2 left-5 bg-black text-white rounded-full hover:text-black hover:bg-white duration-500 cursor-pointer"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu />
      </button>
      <div
        className={`absolute lg:static z-30 top-0 left-0 w-4/5 lg:w-1/5 h-full bg-[#081a24] p-5 transition-transform transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {userData && (
          <div className="md:h-screen overflow-hidden">
            <div className="flex flex-col items-center ">
              {userData.profileImage ? (
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
                    <AiOutlineCamera
                      className="text-blue-500 w-6 h-6 cursor-pointer"
                      onClick={handleImageClick}
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={defaultUserIcon}
                  alt="Default Profile"
                  className="w-32 h-32 object-cover rounded-full"
                />
              )}
              <h3 className="text-lg font-semibold">{userData.firstName}</h3>
              <p className="text-sm italic text-gray-400">{userData.bios}</p>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>
            <div className="mt-5 flex flex-col gap-5 text-white">
              <button
                onClick={() => handleLinkClick("userinfo")}
                className="border border-slate-700 p-2 rounded-lg"
              >
                View Profile
              </button>
              <button
                onClick={() => handleLinkClick("myposts")}
                className="border border-slate-700 p-2 rounded-lg"
              >
                My Posts
              </button>
              <button
                onClick={() => handleLinkClick("settings")}
                className="border border-slate-700 p-2 rounded-lg"
              >
                Settings
              </button>
              <button
                className="border border-slate-700 p-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-4/5 h-full">
        {userData && (
          <>
            {activeComponent === "userinfo" && <UserInfo />}
            {activeComponent === "settings" && <Settings />}
            {activeComponent === "myposts" && <MyPosts />}
          </>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
