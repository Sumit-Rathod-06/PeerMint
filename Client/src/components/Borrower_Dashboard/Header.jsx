import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 ml-64 fixed w-[calc(100%-16rem)] top-0 z-100">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">
            Welcome back, John!
          </h1>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative mr-10">
            <button className="p-2 text-blue-600 hover:text-blue-900 relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                2
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            {/* Avatar */}
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* User Name */}
            <span className="text-sm font-medium text-gray-900">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
