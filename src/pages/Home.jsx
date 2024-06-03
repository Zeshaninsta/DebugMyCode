import React from "react";
import HowItWorks from "./HowItWorks";
import Community from "./Community";
import FAQ from "./FAQ";
import Button from "../components/Button";

const HeroSection = () => {
  return (
    <section className="bg-[#06131a] text-white p-5 min-h-screen w-full z-20 relative">
      <div className=" mx-auto flex flex-col items-center justify-center mb-10 md:h-screen bg-transparent backdrop:blur-md shadow-md border border-slate-700 rounded-lg relative p-2">
        {/* Background */}
        <div className="w-full h-full  z-10 absolute top-1/2 left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden">
          <code className="text-green-400 text-6xl text-center blur-lg opacity-25">
            class DebugMyCode {"{"}
            <br />
            <span className="text-yellow-300 pl-4">constructor</span>() {"{"}
            <br />
            <span className="text-blue-300 pl-8">this.name</span> ={" "}
            <span className="text-pink-300">'DebugMyCode'</span>;
            <br />
            <span className="text-blue-300 pl-8">this.description</span> ={" "}
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
        </div>
        {/* end */}
        <div className="w-full flex flex-col justify-center items-center z-30 relative  ">
          <h1 className="text-4xl md:text-8xl font-bold md:mb-4 font-rubik cursor-pointer text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-900 py-2">
            {`<`}
            DebugMyCode
            {`/>`}
          </h1>
          <p className="text-sm md:text-md text-center mb-4 font-rubik md:w-[70%] text-gray-400 m-auto py-2 md:mt-1">
            DebugMyCode offers a focused and streamlined experience for
            collaborative code debugging and review. Connect with fellow
            developers, share your code, and get quick solutions to your coding
            problems.
          </p>
          <div className="w-full md:w-[40%] bg-slate-800 rounded-lg border border-slate-800 hover:translate-y-3 cursor-move duration-500 shadow-slate-900 backdrop-blur-md">
            <div className="flex items-center justify-between bg-gray-900 rounded-t-lg p-2 ">
              <span className="text-sm text-gray-400">DebugMyCode.js</span>
              <div className="flex space-x-1 ">
                <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600"></button>
                <button className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
                <button className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600"></button>
              </div>
            </div>
            <pre className="overflow-x-auto p-2 bg-[#02131b] ">
              <code className="text-green-400 text-sm md:text-md">
                class DebugMyCode {"{"}
                <br />
                <span className="text-yellow-300 pl-4">constructor</span>(){" "}
                {"{"}
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
        </div>
        <div className="mt-8 text-center z-30 backdrop-blur-md">
          <p className="text-sm md:text-xl mb-2 text-slate-400 font-rubik">
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
