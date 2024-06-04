import React from "react";
import FramerMotion from "./FramerMotion";

const CTA = () => {
  return (
    <FramerMotion>
      <section className="text-white py-20 w-full">
        <div className="w-full mx-auto">
          <div className="w-full mx-auto px-4 h-full">
            <div className="relative w-full mx-auto bg-[#06131a] backdrop-blur-sm rounded-lg shadow-lg p-8 border-2 border-transparent bg-gradient-to-br from-green-500 to-purple-900 h-full">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center font-teko">
                Join Our Community Today!
              </h1>
              <p className="text-lg md:text-xl mb-8 text-center font-rubik">
                Connect with like-minded individuals and get access to exclusive
                content and resources. Sign up now to stay updated!
              </p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default CTA;
