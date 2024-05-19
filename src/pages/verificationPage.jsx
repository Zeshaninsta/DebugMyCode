import React from "react";
import { useLocation } from "react-router-dom";

const VerificationPage = () => {
  // Extract email from query parameter
  const searchParams = new URLSearchParams(useLocation().search);
  const email = searchParams.get("email");

  return (
    <div className="w-full m-auto p-2 lg:p-8 min-h-screen flex justify-center items-center bg-[#0b101b]">
      <div className="rounded-lg shadow-md w-full lg:w-[50%] p-8 border border-slate-700 text-center">
        <h2 className="text-2xl font-bold mb-4 font-pro text-white">
          Email Verification
        </h2>
        <p className="text-gray-300 mb-4">
          Thank you for signing up! An email has been sent to{" "}
          <span className="font-bold text-gray-300">{email}</span>.<br />
          Please check your email and follow the instructions to verify your
          account.
        </p>
        <p className="text-gray-300 mb-4">
          Once verified, you can log in to your account.
        </p>
        <a
          href="/login"
          className="text-blue-400 border-b border-blue-400 hover:text-blue-500"
        >
          Return to Login Page
        </a>
      </div>
    </div>
  );
};

export default VerificationPage;
