import React, { useState, useEffect } from "react";
import HowItWorks from "./HowItWorks";
import Community from "./Community";
import FAQ from "./FAQ";
import Button from "../components/Button";
import Testimonials from "./Testimonial";
import CTA from "./CTA";
import Developers from "./Developers";
import Collaborate from "./Collaborate";
import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import useScrollPosition from "../hooks/useScrollPosition";
import "./Home.css";
import FramerMotion from "./FramerMotion";
import PageTransition from "./PageTransition";
const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section
      className="bg-[#06131a] text-white p-5 min-h-screen w-full z-20 relative"
      id="Home"
    >
      {isScrolled && (
        <div className="text-4xl text-white fixed bottom-5 right-10 border border-slate-700 rounded-full cursor-pointer p-2 z-50 hover:bg-white hover:text-black focus:border-blue-500 hover:border-none">
          <a href="#Home" className="transition-all duration-500 ">
            <IoIosArrowUp />
          </a>
        </div>
      )}
      <FramerMotion>
        <div className=" mx-auto flex flex-col items-center justify-center mb-10 md:h-screen bg-transparent backdrop:blur-md shadow-md border border-slate-700 rounded-lg relative p-2">
          {/* Background staring point*/}
          {/* end */}
          <div className="w-full flex flex-col justify-center items-center z-30 relative  ">
            <h1 className="text-4xl md:text-8xl font-bold md:mb-4 font-rubik cursor-pointer py-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                {"<"} DebugMyCode {"/>"}
              </span>
            </h1>

            <p className="text-sm md:text-md text-center mb-4 font-rubik md:w-[70%] text-gray-400 m-auto py-2 md:mt-1">
              DebugMyCode offers a focused and streamlined experience for
              collaborative code debugging and review. Connect with fellow
              developers, share your code, and get quick solutions to your
              coding problems.
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
                  <span className="text-yellow-300 pl-4">
                    constructor
                  </span>() {"{"}
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
                  const myCode = <span className="text-yellow-300">
                    new
                  </span>{" "}
                  DebugMyCode();
                  <br />
                  myCode.info();
                </code>
              </pre>
            </div>
          </div>
          <div className="mt-8 text-center z-30 ">
            <p className="text-sm md:text-xl mb-2 text-slate-400 font-rubik">
              Ready to streamline your coding experience? Get started now!
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/question">
                <Button text="Get started" />
              </Link>
            </div>
          </div>
        </div>
      </FramerMotion>
      <HowItWorks />
      <FAQ />
      <Community />
      <Testimonials />
      <CTA />
      <Developers />
      <Collaborate />
    </section>
  );
};

export default HeroSection;
