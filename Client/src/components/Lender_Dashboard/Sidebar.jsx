import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Briefcase,
  PiggyBank,
  User,
  LogOut,
  TrendingUp,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/lender/dashboard" },
    { name: "Invest Form", icon: <Briefcase size={20} />, path: "/lender/invest" },
    { name: "My Investments", icon: <PiggyBank size={20} />, path: "/lender/my-investment" },
    { name: "Earnings", icon: <TrendingUp size={20} />, path: "/lender/earnings" },
    { name: "Profile", icon: <User size={20} />, path: "/lender/profile" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/login" }, // ✅ Logout inside sidebar
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 text-gray-700 bg-white shadow-md rounded-lg p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6">
          {/* Logo Section */}
          <div className="mb-8"> {/* ⬅️ Added more space below title */}
            <h2 className="text-2xl font-bold text-violet-700 mb-1">
              PeerMint <span className="text-gray-800">Lender</span>
            </h2>
            <p className="text-sm text-gray-500">lender@peermint.com</p>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg relative transition ${
                      isActive
                        ? "bg-violet-100 text-violet-700 font-semibold"
                        : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
