// HowItWorks.js

import React from "react";
import FAQ from "./FAQ";

const HowItWorks = () => {
  return (
    <section className="bg-gray-900 w-full md:w-[80%] mx-auto text-white py-20 rounded-xl shadow-md border border-slate-700 cursor-pointer ">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            How It Works
          </h1>
          <p className="text-lg md:text-xl mb-12 text-center">
            Discover how DebugMyCode simplifies the code debugging process and
            helps you find solutions quickly:
          </p>
          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center justify-center bg-green-500 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Create an Account
              </h2>
              <p className="text-sm md:text-base text-center">
                Sign up for a DebugMyCode account to get started. It's quick,
                easy, and free!
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center justify-center bg-blue-500 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Post a Question
              </h2>
              <p className="text-sm md:text-base text-center">
                Post your coding question along with any relevant details. Be
                clear and concise to get the best answers!
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center justify-center bg-yellow-500 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Interact with the Community
              </h2>
              <p className="text-sm md:text-base text-center">
                Engage with other developers by answering questions, providing
                solutions, and voting on helpful responses.
              </p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center justify-center bg-purple-500 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Get Solution
              </h2>
              <p className="text-sm md:text-base text-center">
                Receive solutions, suggestions, and insights from the community
                to debug your code and improve your skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
