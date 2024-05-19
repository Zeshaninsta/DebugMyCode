import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-full lg:w-[50%] m-auto p-5 flex flex-col justify-center items-center gap-10">
        <div className="w-full lg:w-[70%] border border-slate-700 rounded-xl p-5 flex flex-col justify-center items-center">
          <div className="relative flex flex-col justify-center items-center">
            <h1 className="text-4xl font-rubik text-white font-bold ">Login</h1>
            <h1 className="absolute -top-5 -left-5 text-7xl font-rubik text-white/10 font-bold ">
              Log
            </h1>
          </div>
          <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-10 to-transparent"></div>
          <label
            htmlFor="Email"
            className="w-full lg:w-[70%] text-white flex flex-col gap-2 m-2"
          >
            Email
            <input
              type="email"
              className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
              placeholder="Email: "
            />
          </label>
          <label
            htmlFor="Password"
            className="text-white w-full lg:w-[70%] flex flex-col gap-2 m-2"
          >
            Password
            <input
              type="password"
              className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
              placeholder="Password: "
            />
          </label>
          <button className="w-[150px] p-2 bg-blue-500 hover:bg-blue-600 duration-200 rounded-sm text-white font-rubik font-bold m-5">
            Login
          </button>
          <p className="text-white font-rubik text-sm leading-normal cursor-pointer hover:text-blue-400 ">
            Forget Password
          </p>
          <p className="text-white font-rubik leading-normal text-sm">
            Don't Have Account?{" "}
            <Link to="/signup">
              <span className="text-blue-400 font-rubik cursor-pointer">
                Signup
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
