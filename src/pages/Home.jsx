import React from "react";
import HowItWorks from "./HowItWorks";
import Community from "./Community";
import FAQ from "./FAQ";
import Button from "../components/Button";

const HeroSection = () => {
  return (
    <section className="bg-[#06131a] text-white p-5 min-h-screen w-full">
      <div className="container mx-auto flex flex-col items-center justify-center mb-10 md:h-screen">
        <h1 className="text-4xl md:text-8xl font-bold mb-4 font-rubik">
          {`<`}
          DebugMyCode
          {`/>`}
        </h1>
        <p className="text-lg md:text-xl text-center mb-4 font-rubik md:w-[70%] mt-2 text-gray-400 m-auto">
          DebugMyCode offers a focused and streamlined experience for
          collaborative code debugging and review. Connect with fellow
          developers, share your code, and get quick solutions to your coding
          problems.
        </p>
        <div className="w-full md:w-[60%] bg-slate-800 rounded-lg shadow-lg">
          <div className="flex items-center justify-between bg-gray-900 rounded-t-lg p-2">
            <span className="text-sm text-gray-400">DebugMyCode.js</span>
            <div className="flex space-x-1">
              <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600"></button>
              <button className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
              <button className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600"></button>
            </div>
          </div>
          <pre className="overflow-x-auto p-4">
            <code className="text-green-400">
              class DebugMyCode {"{"}
              <br />
              <span className="text-yellow-300 pl-4">constructor</span>() {"{"}
              <br />
              <span className="text-blue-300 pl-8">this.name</span> ={" "}
              <span className="text-pink-300">'DebugMyCode'</span>;
              <br />
              <span className="text-blue-300 pl-8">
                this.description
              </span> ={" "}
              <span className="text-pink-300">
                'A platform for collaborative code debugging and review.'
              </span>
              ;
              <br />
              {"}"}
              <br />
              <span className="text-blue-300 pl-4">info</span>() {"{"}
              <br />
              <span className="text-blue-300 pl-8">console.log</span>(
              <span className="text-pink-300">this.name</span>);
              <br />
              <span className="text-blue-300 pl-8">console.log</span>(
              <span className="text-pink-300">this.description</span>);
              <br />
              {"}"}
              <br />
              {"}"}
              <br />
              const myCode = <span className="text-yellow-300">new</span>{" "}
              DebugMyCode();
              <br />
              myCode.info();
            </code>
          </pre>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg md:text-xl mb-6">
            Ready to streamline your coding experience? Get started now!
          </p>
          <div className="flex justify-center space-x-4">
            <Button text="Get started" />
          </div>
        </div>
      </div>
      <HowItWorks />
      <FAQ />
      <Community />
    </section>
  );
};

export default HeroSection;
