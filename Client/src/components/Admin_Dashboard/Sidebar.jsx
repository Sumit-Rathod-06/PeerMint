import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  IdCard, 
  CreditCard, 
  Users, 
  History, 
  Settings 
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation(); // get current URL path
  const [active, setActive] = useState(location.pathname);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { name: "KYC Management", icon: <IdCard size={18} />, path: "/admin/KYCManagement" },
    { name: "Loan Management", icon: <CreditCard size={18} />, path: "/admin/loansManagement" },
    { name: "User Management", icon: <Users size={18} />, path: "/admin/user-management" },
    { name: "Transaction History", icon: <History size={18} />, path: "/admin/transactions" },
    { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
  ];

  return (
    <div className="flex flex-col h-screen w-64 border-r border-r-gray-200 bg-teal-50">
      {/* Top Logo Section */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-b-gray-200">
        <div className="bg-emerald-950 text-white font-bold text-2xl px-2 py-1 rounded">
          P2P
        </div>
        <span className="font-semibold text-gray-700">Admin Panel</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setActive(item.path)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-md text-sm font-medium
              ${
                active === item.path
                  ? "bg-emerald-950 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Admin Profile */}
      <div className="px-4 py-4 border-t border-t-gray-200 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white font-medium">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">Admin User</span>
          <span className="text-xs text-gray-500">admin@p2p.com</span>
        </div>
      </div>
    </div>
  );
}
