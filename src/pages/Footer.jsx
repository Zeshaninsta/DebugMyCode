import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const [quotes, setQuotes] = useState([
    "“Code is like humor. When you have to explain it, it’s bad.” - Cory House",
    "“Programs must be written for people to read, and only incidentally for machines to execute.” - Harold Abelson",
    "“The only way to learn a new programming language is by writing programs in it.” - Dennis Ritchie",
  ]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#06131a] text-white py-8 mt-10 border-t border-slate-700">
      <div className=" mx-auto flex flex-col justify-between items-center px-12">
        <div className="border border-slate-700 p-4 rounded-md ">
          {quotes[currentQuoteIndex] && (
            <p className="text-sm md:text-base  font-rubik h-[80px] md:h-auto">
              {quotes[currentQuoteIndex]}
            </p>
          )}
        </div>
        <div className="flex flex-col  gap-5 md:flex-row justify-between items-center w-full px-12 mt-10">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <h1 className="font-rubik font-bold text-xs lg:text-sm text-white p-2 border border-slate-700 rounded-md cursor-pointer hover:bg-white hover:text-[#06131a] duration-500">
                {"<"} DebugMyCode {"/>"}
              </h1>
            </div>
          </div>
          {/* Navigation links */}
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
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
            <a
              href="https://twitter.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
            <a
              href="https://linkedin.com/company/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
