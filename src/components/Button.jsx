import React from "react";
import "./button.css";

const Button = ({ text }) => {
  return (
    <div>
      <button className="btn w-[100px] lg:w-[150px] p-2 border border-slate-700 rouned-xl text-white text-sm lg:text-xl font-rubik font-bold">
        {text}
      </button>
    </div>
  );
};

export default Button;
