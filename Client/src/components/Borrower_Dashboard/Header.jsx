import React from "react";
import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 ml-64 fixed w-[calc(100%-16rem)] top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back, <span className="text-violet-700">Lender!</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here’s your dashboard summary for today.</p>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2 text-violet-600 hover:bg-violet-50 rounded-full transition duration-200">
              <Bell className="w-6 h-6" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                2
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-9 h-9 bg-violet-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">John Doe</span>
              <span className="text-xs text-gray-500">lender@peermint.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
