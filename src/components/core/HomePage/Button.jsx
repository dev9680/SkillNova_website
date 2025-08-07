import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[14px] px-6 py-3 rounded-md font-bold
        transition-transform transform-gpu duration-200 hover:scale-95
        ${
          active
            ? `bg-orange-400 text-white shadow-md
               dark:bg-yellow-50 dark:text-slate-900 dark:shadow-[0_2px_10px_rgba(255,255,255,0.08)]`
            : `bg-gray-100 text-gray-700 shadow
               dark:bg-richblack-800 dark:text-richblack-200`
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
