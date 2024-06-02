import { Link } from "react-router-dom";
import NavProfile from "../User/NavProfile";
import { useAuth } from "../contexts/AuthContext";
import useScrollPosition from "../hooks/useScrollPosition"; // Import the custom hook
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import MyPosts from "../User/MyPosts";
import UserDashboard from "../User/userDashboard";
import { IoHome } from "react-icons/io5";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";

const Nav = () => {
  const scrollPosition = useScrollPosition();
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`w-full flex flex-col relative border-b border-slate-800 justify-center items-center z-50 px-5 py-2 transition-all duration-300 ${
        scrollPosition > 0
          ? "sticky top-0 bg-transparent backdrop-blur-md"
          : "relative bg-transparent"
      }`}
    >
      <nav className="w-full m-auto lg:w-[60%] px-2 py-4 flex justify-between items-center z-20">
        <Link to="/">
          <h1 className="font-rubik font-bold text-xs lg:text-sm text-white p-2 border border-slate-700 rounded-md cursor-pointer hover:bg-white hover:text-[#06131a] duration-500">
            {"<"} DebugMyCode {"/>"}
          </h1>
        </Link>
        <div className="hidden md:flex justify-evenly items-center gap-5 text-white/90 font-rubik rounded-xl p-2 text-sm border border-slate-700 m-auto">
          <Link to="/">
            <li className="flex justify-center items-center gap-2 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              <IoHome />
              Home
            </li>
          </Link>
          <Link to="/question">
            <li className="flex justify-center items-center gap-2 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              <RiQuestionAnswerFill />
              Question
            </li>
          </Link>
          <Link to="/userposts">
            <li className="flex justify-center items-center gap-2 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              <FaRegBookmark />
              Your Posts
            </li>
          </Link>
          <Link to="/userdashboard">
            <li className="flex justify-center items-center gap-2 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              <RxDashboard />
              Dashboard
            </li>
          </Link>
        </div>
        <div className="hidden md:flex justify-evenly items-center gap-2 text-white">
          {currentUser ? (
            <NavProfile />
          ) : (
            <>
              <Link to="/login">
                <button className="w-[120px] border border-slate-700 p-2 text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-[120px] border border-slate-700 p-2 text-sm">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center z-10 h-screen w-full bg-[#06131a] gap-2 p-5 border-t border-slate-700 absolute top-20 ">
          <ul className="flex flex-col w-full items-center gap-2 text-white/90 font-rubik rounded-xl px-2 text-sm">
            <Link
              to="/"
              className="w-full flex text-center justify-center items-center"
              onClick={toggleMobileMenu}
            >
              <li className="w-full cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none border border-slate-700 ">
                Home
              </li>
            </Link>
            <Link
              to="/question"
              className="w-full flex text-center justify-center items-center"
              onClick={toggleMobileMenu}
            >
              <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none border border-slate-700 w-full">
                Question
              </li>
            </Link>
          </ul>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent to-transparent via-slate-800 m-2"></div>
          {currentUser ? (
            <NavProfile />
          ) : (
            <div className="flex flex-col items-center gap-2 text-white mt-4 w-full p-2">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent to-transparent via-slate-800 m-2"></div>
              <Link
                to="/login"
                className="w-full flex text-center justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <button className="w-full border border-slate-700 p-2 text-sm rounded-md">
                  Login
                </button>
              </Link>
              <Link
                to="/signup"
                className="w-full flex text-center justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <button className="w-full border border-slate-700 p-2 text-sm rounded-md">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
