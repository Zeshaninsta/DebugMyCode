import React from "react";
import { FaGithub } from "react-icons/fa";
import FramerMotion from "./FramerMotion";

const Collaborate = () => {
  return (
    <FramerMotion>
      <section className="bg-gradient-to-b from-slate-900 via-slate-700 to-slate-900 text-white py-20 mt-10 relative">
        <div className="w-full z-20  flex flex-col justify-center items-center">
          <div className="absolute  left-0 right-0 z-10 bottom-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="fill-current text-slate-900"
            >
              <path
                fillOpacity="1"
                d="M0,128L40,138.7C80,149,160,171,240,170.7C320,171,400,149,480,133.3C560,117,640,107,720,101.3C800,96,880,96,960,122.7C1040,149,1120,203,1200,208C1280,213,1360,171,1400,149.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="container mx-auto z-20">
            <div className="max-w-3xl mx-auto px-4 z-20">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center font-teko mt-10">
                Collaborate with Us
              </h1>
              <p className="text-lg md:text-xl mb-8 text-center font-rubik">
                Would you like to collaborate on this project? It's open-source!
                Let's work together on this awesome project.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://github.com/zeshaninsta/debugmycode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-full text-lg font-bold transition duration-300"
                >
                  <FaGithub className="mr-2" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default Collaborate;
