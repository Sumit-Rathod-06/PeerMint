import React from "react";
import { HandCoins } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 w-64 h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center space-x-2">
        <HandCoins className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-2 text-white rounded-xl h-10 w-10" />
        <h1 className="text-xl font-semibold text-gray-900">PeerMint</h1>
        <hr className="h-5" />
      </div>


      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {/* Dashboard - Active */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white bg-indigo-400 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </a>
          </li>

          {/* My Loans */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              My Loans
            </a>
          </li>

          {/* Apply for Loan */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Apply for Loan
            </a>
          </li>

          {/* Make a Payment */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              Make a Payment
            </a>
          </li>

          {/* Transaction History */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Transaction History
            </a>
          </li>

          {/* Profile Settings */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Profile Settings
            </a>
          </li>

          {/* Help & Support */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Help & Support
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 001-1h10.586l-2.293-2.293a1 1 0 10-1.414 1.414L14.586 5H4a3 3 0 00-3 3v8a3 3 0 003 3h12a3 3 0 003-3V8a3 3 0 00-3-3H6.414l2.293-2.293a1 1 0 10-1.414-1.414L4.586 4H3z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
