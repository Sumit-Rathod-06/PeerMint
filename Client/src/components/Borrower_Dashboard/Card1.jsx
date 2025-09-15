import React from "react";
import { Link } from "react-router-dom";

const Card1 = () => {
  return (
    <div className="border-2 border-indigo-400 rounded-2xl p-6 bg-white ml-68 mr-4 mt-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 border-2 border-indigo-400 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Complete Your Verification to Get Started
        </h2>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">
        To apply for a loan, you first need to complete your KYC (Know Your
        Customer) verification. It's a secure and simple process.
      </p>

      <Link to="/borrower/kyc-form">
        <button className="bg-slate-700 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors">
          Start KYC Verification
        </button>
      </Link>
    </div>
  );
};

export default Card1;
