import { useState, useEffect, useRef } from "react";
import { FiUser, FiSettings, FiLogOut, FiHome } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "userdb", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggle = () => {
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex w-full flex-col justify-center items-center"
        // ref={profileRef}
      >
        <div
          className="flex justify-center items-center cursor-pointer w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border border-slate-600"
          onClick={toggle}
        >
          {userData && userData.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <FiUser size={30} className="text-white" />
          )}
        </div>
        {show && (
          <div className="z-20 p-5 flex flex-col justify-between items-center w-[300px] lg:w-[200px] h-[400px] bg-transparent backdrop-blur-xl border border-slate-800 absolute top-20 lg:-right-10 right-0 ">
            <div className="w-full flex flex-col bg-transparent backdrop:blur-md">
              <div className="w-full mb-5 text-center ">
                <h1 className="text-white font-rubik text-sm">
                  Welcome {userData ? userData.Name : "User"}
                </h1>
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto my-4 "></div>
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <ul className="flex flex-col justify-start items-start gap-5 w-full">
                  <Link to="/userdashboard">
                    <li className="w-full text-gray-700 hover:text-white duration-200 cursor-pointer flex items-center gap-2">
                      <FiUser />
                      Profile
                    </li>
                  </Link>
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto "></div>
                  <Link to="/userdashboard">
                    <li className="w-full text-gray-700 hover:text-white duration-200 cursor-pointer flex items-center gap-2">
                      <FiHome />
                      Dashboard
                    </li>
                  </Link>
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto"></div>
                  <Link to="/userdashboard">
                    <li className="w-full text-gray-700 hover:text-white duration-200 cursor-pointer flex items-center gap-2">
                      <FiSettings />
                      Setting
                    </li>
                  </Link>
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto"></div>
                </ul>
              </div>
            </div>
            <div className="w-full flex justify-center items-center z-20">
              <button
                className="w-full text-gray-700 justify-center hover:text-red-500 duration-200  cursor-pointer flex items-center gap-2"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavProfile;
