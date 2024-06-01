import { Link } from "react-router-dom";
import NavProfile from "../User/NavProfile";
import { useAuth } from "../contexts/AuthContext";
import useScrollPosition from "../hooks/useScrollPosition"; // Import the custom hook

const Nav = () => {
  const scrollPosition = useScrollPosition();
  const { currentUser } = useAuth();

  return (
    <div
      className={`w-full flex flex-col border-b border-slate-800 justify-center items-center z-50 px-2 py-5 transition-all duration-300 ${
        scrollPosition > 0
          ? "sticky top-0 bg-transparent backdrop-blur-md"
          : "relative bg-transparent"
      }`}
    >
      <nav className="w-full m-auto lg:w-[60%] px-2 py-4 flex justify-between items-center z-20">
        <Link to="/">
          <h1 className="font-rubik font-bold text-sm text-white p-2 border border-slate-700 rounded-md cursor-pointer hover:bg-white hover:text-[#06131a] duration-500">
            {"<"} DebugMyCode {"/>"}
          </h1>
        </Link>
        <ul className="flex justify-evenly items-center gap-5 text-white/90 font-rubik rounded-xl p-2 text-sm border border-slate-700 m-auto">
          <Link to="/">
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500">
              Home
            </li>
          </Link>
          <Link to="/question">
            <li className="cursor-pointer hover:text-[#06131a] hover:bg-white p-2 rounded-lg duration-500">
              Question
            </li>
          </Link>
        </ul>

        {currentUser ? (
          <NavProfile />
        ) : (
          <div className="flex justify-evenly items-center gap-2 text-white">
            <Link to="/login">
              <button className="w-[120px] border border-slate-700 p-2 text-sm">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-[120px] border border-slate-700 p-2 text-sm">
                Signup
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
