// Developers.jsx

import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Developers = () => {
  return (
    <section className="text-white md:mb-20">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko">
            Meet Our Developers
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Developer 1 - Emran */}
            <div className="bg-[#06131a] backdrop-blur-sm rounded-lg shadow-lg p-8 border-2 border-transparent bg-gradient-to-br from-gray-800 to-slate-900 hover:scale-105 duration-500 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4 font-rubik border-b border-red-300">
                Emran Mohammed
              </h2>
              <p className="text-lg mb-4 font-rubik">
                An experienced full-stack developer with expertise in React and
                Node.js.
              </p>
              <div className="flex flex-col">
                <p className="mb-2 font-rubik ">Social Media</p>
                <div className="flex items-center space-x-4 border border-slate-700 p-2 rounded-md w-[100px]">
                  <a
                    href="https://github.com/zeshaninsta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                  <a
                    href="https://www.twitter.com/zeshaninsta/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zeshaninsta/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
            {/* Developer 2 - Betelehem */}
            <div className="bg-[#06131a] backdrop-blur-sm rounded-lg shadow-lg p-8 border-2 border-transparent bg-gradient-to-br from-gray-800 to-slate-900 hover:scale-105 duration-500 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4 font-rubik border-b border-red-300">
                Betelehem Getachew
              </h2>
              <p className="text-lg mb-4 font-rubik">
                An experienced full-stack developer passionate about building
                scalable web applications.
              </p>
              <div className="flex flex-col">
                <p className="mb-2 font-rubik ">Social Media</p>
                <div className="flex items-center space-x-4 border border-slate-700 p-2 rounded-md w-[100px]">
                  <a
                    href="https://github.com/betbaba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bethlehem-getachew-52b85827b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-gray-400 hover:text-gray-300 transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developers;
