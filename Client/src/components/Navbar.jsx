import React from "react";
import { HandCoins, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-3 py-7 h-12 mb-2 font-(family-name:--font-poppins) bg-white">
        <div className="flex items-center space-x-2 ml-12">
          <HandCoins className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-2 text-white rounded-xl h-10 w-10" />
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-400 font-semibold">
            PeerMint
          </h1>
        </div>
        <div>
          <ul className="flex space-x-6 font-semibold">
            <li
              className="text-lg text-slate-600 hover:text-indigo-600 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              How it Works
            </li>
            <li
              className="text-lg text-slate-600 hover:text-indigo-600 cursor-pointer"
              onClick={() => scrollToSection("features")}
            >
              About us
            </li>
            <li
              className="text-lg text-slate-600 hover:text-indigo-600 cursor-pointer"
              onClick={() => scrollToSection("faq")}
            >
              FAQs
            </li>
            <li
              className="text-lg text-slate-600 hover:text-indigo-600 cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 mr-6">
          <button
            className="text-lg text-slate-800 cursor-pointer border-1 border-gray-300 py-1 px-2 rounded-xl shadow-lg hover:bg-gradient-to-r from-indigo-600 to-indigo-400 hover:scale-105 hover:text-white"
            onClick={() => navigate("/login")}
          >
            Borrower Login
          </button>
          <button
            className="text-lg text-slate-800 cursor-pointer border-1 border-gray-300 py-1 px-2 rounded-xl shadow-lg hover:bg-gradient-to-r from-indigo-600 to-indigo-400 hover:text-white hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Lender Login
          </button>
          <button
            className="p-2 bg-gradient-to-r from-indigo-600 to-indigo-400 hover:bg-green-600 text-white rounded-2xl cursor-pointer hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 z-50 bg-white flex items-center w-screen justify-between py-2">
        <div className="flex items-center space-x-2 ml-8">
          <Waves className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-2 text-white rounded-xl h-10 w-10" />
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-400 font-semibold">
            PeerMint
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
