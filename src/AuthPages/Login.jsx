import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const Login = () => {
  const Navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preFilledEmail = queryParams.get("email");
  const [email, setEmail] = useState(preFilledEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useAuth();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore to get the role
      const userDoc = await getDoc(doc(db, "userdb", user.uid));
      const userData = userDoc.data();

      //   if (userData) {
      //     // Redirect based on user role
      //     if (userData.role === "admin") {
      //       // Redirect to Admin Dashboard
      //       Navigation("/admin");
      //     } else {
      //       // Redirect to Home page for users
      //       Navigation("/");
      //     }
      //   } else {
      //     // Handle case where user data is not found
      //     setError("User data not found");
      //     setSuccessMessage("");
      //   }

      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setError("");
      setSuccessMessage("Login successful!");
      Navigation("/");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent. Check your inbox!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <label
            htmlFor="Email"
            className="w-full lg:w-[70%] text-white flex flex-col gap-2 m-2"
          >
            Email
            <input
              type="email"
              className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
              placeholder="Email: "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="w-[150px] p-2 bg-blue-500 hover:bg-blue-600 duration-200 rounded-sm text-white font-rubik font-bold m-5"
            onClick={handleLogin}
          >
            Login
          </button>
          <p
            className="text-white font-rubik text-sm leading-normal cursor-pointer hover:text-blue-400 "
            onClick={handleForgotPassword}
          >
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
