import React from "react";
import FAQ from "./FAQ";
import FramerMotion from "./FramerMotion";
import PageTransition from "./PageTransition";

const HowItWorks = () => {
  return (
    <PageTransition>
      <FramerMotion>
        <section className="bg-gray-900 w-full md:w-[80%] mx-auto text-white py-5 md:py-20 rounded-xl shadow-md border border-slate-700 cursor-pointer ">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto px-4 leading-normal">
              <h1 className="text-4xl md:text-6xl font-bold mb-5 md:mb-8 text-center font-teko uppercase">
                How It Works
              </h1>
              <p className="text-lg md:text-xl md:mb-12 text-center font-rubik">
                Discover how DebugMyCode simplifies the code debugging process
                and helps you find solutions quickly:
              </p>
              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {/* Step 1 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[250px]">
                    <div className="w-24 h-24 rounded-3xl opacity-70 bg-green-500 absolute top-0 left-0"></div>
                    {/* <div className="w-24 h-24 rounded-3xl bg-green-500 absolute bottom-0 right-0"></div> */}
                    <div className="z-20 flex flex-col items-center justify-center bg-transparent backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 h-full border border-green-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Create an Account
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Sign up for a DebugMyCode account to get started. It's
                        quick, easy, and free!
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                <FramerMotion>
                  {/* Step 2 */}
                  <div className="relative rounded-lg md:h-[250px]">
                    <div className="w-24 h-24 bg-blue-500 opacity-70 absolute top-0 left-0 rounded-3xl"></div>
                    {/* <div className="w-24 h-24 bg-blue-500 rounded-3xl absolute bottom-0 right-0"></div> */}
                    <div className="flex flex-col items-center justify-center z-20 backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 h-full border border-blue-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Post a Question
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Post your coding question along with any relevant
                        details. Be clear and concise to get the best answers!
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                {/* Step 3 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[250px]">
                    <div className="w-24 h-24 opacity-70 bg-yellow-500 absolute top-0 left-0 rounded-3xl"></div>
                    {/* <div className="w-24 h-24 bg-yellow-500 rounded-3xl absolute bottom-0 right-0"></div> */}
                    <div className="flex flex-col items-center justify-center z-30 backdrop-blur-md h-full rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 border border-yellow-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Interact with the Community
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Engage with other developers by answering questions,
                        providing solutions, and voting on helpful responses.
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                {/* Step 4 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[250px]">
                    <div className="w-24 h-24 opacity-70 bg-purple-500 absolute top-0 left-0 rounded-3xl"></div>
                    {/* <div className="w-24 h-24 bg-purple-500 rounded-3xl absolute bottom-0 right-0"></div> */}
                    <div className="flex flex-col items-center justify-center z-20 h-full backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 border border-purple-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Get Solution
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Receive solutions, suggestions, and insights from the
                        community to debug your code and improve your skills.
                      </p>
                    </div>
                  </div>
                </FramerMotion>
              </div>
            </div>
          </div>
        </section>
      </FramerMotion>
    </PageTransition>
  );
};

export default HowItWorks;
