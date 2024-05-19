import React from "react";
import MyButton from "../components/Button";
import ShowPosts from "./showPost";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col justify-center items-center w-full relative z-10 h-screen overflow-hidden">
        <div className="w-[400px] h-[400px] rounded-full bg-blue-800 absolute -top-60 filter blur-3xl -z-10 opacity-25"></div>
        <div className="w-[400px] h-[400px] bg-blue-800 absolute -bottom-60 rounded-full filter blur-3xl -z-10 opacity-25"></div>
        <h1 className="text-9xl font-sedan text-white">
          {" "}
          {"<"}DebugMyCode{"/>"}
        </h1>
        <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-5 to-transparent"></div>
        <p className="flex flex-col justify-center items-center font-sedan text-white text-4xl">
          Your Only Destination for collaboration coding solutions.
          <span>Welcome to DebugMyCode</span>
        </p>
        <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-5 to-transparent"></div>
        <MyButton text={"Get started"} />
      </div>
      <ShowPosts />
    </div>
  );
};

export default Home;
