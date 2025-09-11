import React,{useState} from "react";
import { MapPin, House, Waves, Info,AlignJustify,X, HandCoins } from "lucide-react";

const Navbar = () => {

  return (
    <>
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-3 py-7 h-12 mb-2 font-(family-name:--font-poppins) bg-white">
        <div className="flex items-center space-x-2 ml-12">
          <HandCoins className="bg-gradient-to-r from-purple-600 to-purple-400 p-2 text-white rounded-xl h-10 w-10" />
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-400 font-semibold">
            PeerMint
          </h1>
        </div>
        <div>
          <ul className="flex space-x-6 font-semibold">
            <div className="flex items-center gap-0.5 text-slate-600 hover:text-purple-600 cursor-pointer">
              {/* <House className="h-5" /> */}
              <li className="text-lg ">
                How it Works
              </li>
            </div>
            <div className="flex items-center gap-0.5 text-slate-600 hover:text-purple-600 cursor-pointer">
              {/* <MapPin className="h-5 " /> */}
              <li className="text-lg ">
                About us
              </li>
            </div>
            <div className="flex items-center gap-0.5 text-slate-600 hover:text-purple-600 cursor-pointer">
              {/* <Info className="h-5 " /> */}
              <li className="text-lg ">
                FAQs
              </li>
            </div>
            <div className="flex items-center gap-0.5 text-slate-600 hover:text-purple-600 cursor-pointer">
              {/* <Info className="h-5 " /> */}
              <li className="text-lg ">
                Contact
              </li>
            </div>
          </ul>
        </div>
        <div className="flex items-center space-x-4 mr-6">
          <p className="text-lg text-slate-800 cursor-pointer border-1 py-1 px-2 rounded-xl shadow-lg hover:bg-gradient-to-r from-purple-600 to-purple-400 hover:scale-105 hover:text-white">Borrower Login</p>
          <p className="text-lg text-slate-800 cursor-pointer border-1 py-1 px-2 rounded-xl shadow-lg hover:bg-gradient-to-r from-purple-600 to-purple-400 hover:text-white hover:scale-105">Lender Login</p>
          <button className="p-2 bg-gradient-to-r from-purple-600 to-purple-400 hover:bg-green-600 text-white rounded-2xl cursor-pointer hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
      <div className="md:hidden fixed top-0 left-0 z-50 bg-white flex items-center w-screen justify-between py-2">
        <div className="flex items-center space-x-2 ml-8">
          <Waves className="bg-gradient-to-r from-purple-600 to-purple-400 p-2 text-white rounded-xl h-10 w-10" />
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-400 font-semibold">
            PeerMint
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
