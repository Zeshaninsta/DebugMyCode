import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavProfile from "../User/NavProfile";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
  const { currentUser } = useAuth();

  return (
    <div className="w-full z-30">
      <nav className="w-full px-16 py-4 flex justify-between items-center bg-[#06131a] z-20">
        <Link to="/">
          <h1 className="font-rubik font-bold text-sm text-white p-2 border border-slate-700 rounded-md cursor-pointer hover:bg-white hover:text-[#06131a] duration-500">
            {"<"} DebugMyCode {"/>"}
          </h1>
        </Link>
        <ul className="flex justify-evenly items-center gap-5 text-white/90 font-rubik border border-slate-700 rounded-xl p-2 text-sm">
          <Link to="/">
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500">
              About
            </li>
          </Link>
          <li className="duration-500 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg">
            Question
          </li>
          <li className="duration-500 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg">
            Services
          </li>
          <li className="duration-500 cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg">
            Feedback
          </li>
        </ul>

        {currentUser ? (
          <NavProfile />
        ) : (
          <div className="flex justify-evenly items-center gap-2 text-white">
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
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
