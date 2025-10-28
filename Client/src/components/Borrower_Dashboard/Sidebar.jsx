import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  IdCard, 
  CreditCard, 
  Users, 
  LogOut,
  Wallet
} from "lucide-react";
import axios from "axios";
import BASE_URL from "../../assets/assests";

export default function BorrowerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [kycStatus, setKycStatus] = useState(null);

   useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/borrower/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKycStatus(res.data.kyc_status);
      } catch (err) {
        console.error("Error fetching borrower data:", err);
      }
    };
    fetchBorrower();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    alert("You have been logged out successfully.");
  };

  // Sidebar items based on KYC status
  const baseMenu = [
    { name: "Home", icon: <LayoutDashboard size={18} />, path: "/borrower/dashboard" },
    { name: "KYC Verification", icon: <IdCard size={18} />, path: "/borrower/kyc-form" },
  ];

  const fullMenu = [
    { name: "Home", icon: <LayoutDashboard size={18} />, path: "/borrower/dashboard" },
    { name: "Apply for Loan", icon: <IdCard size={18} />, path: "/borrower/loan-application" },
    { name: "My Loans / Loan Status", icon: <Wallet size={18} />, path: "/borrower/loansManagement" },
    { name: "Repayment / EMI Schedule", icon: <CreditCard size={18} />, path: "/borrower/repayment" },
    { name: "Profile", icon: <Users size={18} />, path: "/borrower/profile" },
  ];

  const menuItems =
    kycStatus === "approved" ? fullMenu : baseMenu;

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
              ${active === item.path
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
