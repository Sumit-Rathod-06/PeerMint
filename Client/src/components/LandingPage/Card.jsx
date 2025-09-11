import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-3xl w-full max-w-sm text-center border border-gray-100">
      <div className="flex items-center justify-center w-16 h-16 mb-6 bg-indigo-50 text-indigo-700 rounded-2xl text-3xl font-bold">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;
