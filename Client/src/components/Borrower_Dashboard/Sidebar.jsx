import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  IdCard, 
  CreditCard, 
  Users, 
  History, 
  LogOut 
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const handleLogout = () => {
    // ✅ Remove token from localStorage
    localStorage.removeItem("token");

    // ✅ Optionally remove user data if stored
    localStorage.removeItem("user");

    // ✅ Redirect to login/home page
    navigate("/");

    // ✅ Optional confirmation
    alert("You have been logged out successfully.");
  };

  const menuItems = [
    { name: "Home", icon: <LayoutDashboard size={18} />, path: "/borrower/dashboard" },
    { name: "Apply for Loan", icon: <IdCard size={18} />, path: "/borrower/loan-application" },
    { name: "My Loans / Loan Status", icon: <CreditCard size={18} />, path: "/borrower/loansManagement" },
    { name: "Repayment / EMI Schedule", icon: <Users size={18} />, path: "/borrower/users" },
    { name: "Profile", icon: <History size={18} />, path: "/borrower/profile" },
  ];

  return (
    <div className="fixed flex flex-col h-screen w-64 border-r border-r-gray-200 bg-white">
      {/* Top Logo Section */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-b-gray-200">
        <div className="bg-indigo-400 text-white font-bold text-2xl px-2 py-1 rounded">
          P2P
        </div>
        <span className="font-semibold text-gray-700">Borrower Dashboard</span>
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
                  ? "bg-indigo-400 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Bottom Admin Profile */}
      <div className="px-4 py-4 border-t border-t-gray-200 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-400 text-white font-medium">
          B
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">Borrower</span>
          <span className="text-xs text-gray-500">abc@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
