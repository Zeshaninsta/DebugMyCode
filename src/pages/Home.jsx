import React from "react";
import MyButton from "../components/Button";
import ShowPosts from "./showPost";
import CreatePost from "../pages/CreatePost";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col justify-center items-center w-full relative z-10  h-full lg:h-screen overflow-hidden">
        {/* <div className="w-[400px] h-[400px] rounded-full bg-blue-800 absolute -top-60 filter blur-3xl -z-10 opacity-25"></div> */}
        <div className="hidden lg:block w-[400px] h-[400px] bg-blue-800 absolute -bottom-60 rounded-full filter blur-3xl -z-10 opacity-25"></div>
        <h1 className="mt-10 lg:mt-0 text-3xl text-center lg:text-9xl font-sedan text-white">
          {" "}
          {"<"}DebugMyCode{"/>"}
        </h1>
        <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-5 to-transparent"></div>
        <p className="flex flex-col justify-center items-center font-sedan text-white text-xl text-center lg:text-4xl">
          Your Only Destination for collaboration coding solutions.
          <span>Welcome to DebugMyCode</span>
        </p>
        <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-5 to-transparent"></div>
        <MyButton text={"Get started"} />
      </div>
      {/* <CreatePost />
      <ShowPosts /> */}
    </div>
  );
};

export default Home;
