import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
