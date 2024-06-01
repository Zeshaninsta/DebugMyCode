import { Link } from "react-router-dom";
import NavProfile from "../User/NavProfile";
import { useAuth } from "../contexts/AuthContext";
import useScrollPosition from "../hooks/useScrollPosition"; // Import the custom hook
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const scrollPosition = useScrollPosition();
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`w-full flex flex-col border-b border-slate-800 justify-center items-center z-50 px-2 py-5 transition-all duration-300 ${
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
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              Home
            </li>
          </Link>
          <Link to="/question">
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
              Question
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
        <div className="md:hidden flex flex-col items-center w-full bg-[#06131a] p-5 border-t border-slate-700">
          <ul className="flex flex-col items-center gap-5 text-white/90 font-rubik rounded-xl p-2 text-sm">
            <Link to="/" onClick={toggleMobileMenu}>
              <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
                Home
              </li>
            </Link>
            <Link to="/question" onClick={toggleMobileMenu}>
              <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500 list-none">
                Question
              </li>
            </Link>
          </ul>
          {currentUser ? (
            <NavProfile />
          ) : (
            <div className="flex flex-col items-center gap-2 text-white mt-4">
              <Link to="/login" onClick={toggleMobileMenu}>
                <button className="w-full border border-slate-700 p-2 text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={toggleMobileMenu}>
                <button className="w-full border border-slate-700 p-2 text-sm">
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
