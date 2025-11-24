import React from "react";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-30">
      <h1 className="text-xl font-semibold text-gray-800">
        👋 Welcome, <span className="text-violet-700">Lender</span>
      </h1>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-500 cursor-pointer hover:text-violet-700 transition" />
        <div className="w-9 h-9 bg-violet-200 rounded-full flex items-center justify-center text-violet-800 font-semibold">
          L
        </div>
      </div>
    </header>
  );
};

export default Header;
