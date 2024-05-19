import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadProfilePicture } from "../User/uploadProfilePicture";
const Signup = () => {
  const [secondpage, setSecondPage] = useState(false);
  const { currentUser } = useAuth(); // Get the currentUser from the AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("user");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const Navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const handleSignUp = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: Name,
      });

      // Add user information to Firestore database
      await setDoc(doc(db, "userdb", user.uid), {
        role: role,
        Name: Name,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth,
        createdAt: new Date(),
      });

      // Upload profile picture if selected
      if (profilePicture) {
        await uploadProfilePicture(user, profilePicture); // Use the imported function
      }

      // Sign out the user after account creation
      await auth.signOut();

      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setName("");
      setGender("");
      setRole("user");
      setDateOfBirth("");
      setProfilePicture(null); // Reset profile picture state
      setError("");
      Navigate(`/verify-email?email=${email}`); // Redirect to email verification page
      toast.success("Your Account is Created successfylly");
    } catch (error) {
      setError(error.message);
      toast.error("Something Went Wrong");
    }
  };

  const Next = () => {
    setSecondPage(!secondpage);
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-full lg:w-[50%] m-auto p-5 flex flex-col justify-center items-center gap-10">
        <div className="w-full lg:w-[70%] border border-slate-700 rounded-xl p-5 flex flex-col justify-center items-center">
          <div className="relative flex flex-col justify-center items-center">
            <h1 className="text-4xl font-rubik text-white font-bold ">
              Signup
            </h1>
            <h1 className="absolute -top-5 -left-5 text-7xl font-rubik text-white/10 font-bold ">
              Sign
            </h1>
          </div>
          <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 m-10 to-transparent"></div>
          {/* First Page */}
          {!secondpage ? (
            <div className="w-full flex flex-col justify-center items-center">
              <label
                htmlFor="Name"
                className="w-full lg:w-[70%] text-white flex flex-col gap-2 m-2"
              >
                Name
                <input
                  type="text"
                  className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
                  placeholder="Name: "
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
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
            </div>
          ) : (
            //    second page
            <div className="w-full flex justify-center items-center flex-col">
              <label
                htmlFor="DateofBirth"
                className="w-full lg:w-[70%] text-white flex flex-col gap-2 m-2"
              >
                Date of Birth
                <input
                  type="date"
                  className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </label>
              <label
                htmlFor="Gender"
                className="w-full lg:w-[70%] text-white flex flex-col gap-2 m-2"
              >
                Gender
                <select
                  className="bg-transparent border border-slate-700 p-2"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label
                htmlFor="prfoileimage"
                className="text-white w-full lg:w-[70%] flex flex-col gap-2 m-2"
              >
                Profile Image
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-white bg-transparent p-5 border border-slate-800 outline-none focus:border-blue-500"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </label>
            </div>
          )}
          ;
          {!secondpage ? (
            <button
              className="w-[150px] p-2 bg-blue-500 hover:bg-blue-600 duration-200 rounded-sm text-white font-rubik font-bold m-5"
              onClick={Next}
            >
              Next
            </button>
          ) : (
            <div className="flex justify-evenly items-center gap-2">
              <button
                className="w-[150px] p-2 bg-blue-500 hover:bg-blue-600 duration-200 rounded-sm text-white font-rubik font-bold m-5"
                onClick={handleSignUp}
              >
                Signup
              </button>
              <button
                className="w-[150px] p-2 bg-red-500 hover:bg-red-600 duration-200 rounded-sm text-white font-rubik font-bold m-5"
                onClick={Next}
              >
                Back
              </button>
            </div>
          )}
          <p className="text-white font-rubik leading-normal text-sm">
            Already Have Account?{" "}
            <Link to="/login">
              <span className="text-blue-400 font-rubik cursor-pointer">
                Login
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
