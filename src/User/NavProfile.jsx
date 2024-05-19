import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
const NavProfile = () => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center relative">
        <div
          className="flex justify-center items-center cursor-pointer w-[50px] h-[50px] rounded-full border border-slate-600"
          onClick={toggle}
        >
          <FiUser size={30} className=" text-white" />
        </div>
        {show ? (
          <div className="p-5 flex flex-col justify-start items-center w-[200px] h-[400px] bg-transparent backdrop:blur-xl border border-slate-800 absolute top-20 -right-10">
            <h1 className="text-white font-rubik">Welcome Imran</h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavProfile;
