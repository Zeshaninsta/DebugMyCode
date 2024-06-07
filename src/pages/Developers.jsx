import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import FramerMotion from "./FramerMotion";
import { FaArrowRight } from "react-icons/fa";
const Developers = () => {
  return (
    <FramerMotion>
      <section className="text-white md:mb-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto px-4">
            <FramerMotion>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko">
                About DebugMyCode
              </h1>
              <div className="flex flex-col justify-center items-center bg-[#06131a] border border-slate-700 p-3 mb-5 rounded-lg">
                <p className="text-md md:text-xl mb-2 md:mb-8 text-start font-rubik">
                  DebugMyCode is a platform where developers collaborate to
                  solve coding challenges and share knowledge. Inspired by our
                  own struggles in finding quick and reliable debugging help, we
                  created this community-driven platform to make coding more
                  enjoyable and productive.
                </p>
                <p className="text-md md:text-xl mb-8 text-start font-rubik">
                  This project began as a portfolio piece for Holberton School,
                  but it has grown into a passion project aimed at fostering a
                  supportive community for developers. Learn more about
                  Holberton School{" "}
                  <a
                    href="https://www.holbertonschool.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 flex justify-center items-center gap-2"
                  >
                    here
                    <FaArrowRight />
                  </a>
                </p>
                <div className="text-center mb-8">
                  <a
                    href="https://github.com/zeshaninsta/debugmycode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-lg flex justify-center items-center border border-slate-700 p-2 rounded-lg gap-2 hover:bg-white/90 hover:text-black duration-5000"
                  >
                    View our project on GitHub
                    <FaArrowRight />
                  </a>
                </div>
              </div>
            </FramerMotion>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko">
              Meet Our Developers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border border-slate-700 p-2 md:p-4">
              {/* Developer 1 - Emran */}
              <FramerMotion>
                <div className="bg-[#06131a] backdrop-blur-sm rounded-lg shadow-lg p-8 border-2 border-transparent bg-gradient-to-br from-gray-800 to-slate-900 hover:scale-105 duration-500 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-4 font-rubik border-b border-red-300">
                    Emran Mohammed
                  </h2>
                  <p className="text-lg mb-4 font-rubik">
                    An experienced full-stack developer with expertise in React
                    and Node.js.
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
              </FramerMotion>
              {/* Developer 2 - Betelehem */}
              <FramerMotion>
                <div className="bg-[#06131a] backdrop-blur-sm rounded-lg shadow-lg p-8 border-2 border-transparent bg-gradient-to-br from-gray-800 to-slate-900 hover:scale-105 duration-500 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-4 font-rubik border-b border-red-300">
                    Betelehem Getachew
                  </h2>
                  <p className="text-lg mb-4 font-rubik">
                    An experienced full-stack developer passionate about
                    building scalable web applications.
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
              </FramerMotion>
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default Developers;
