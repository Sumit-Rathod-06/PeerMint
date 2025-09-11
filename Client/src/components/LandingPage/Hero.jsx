import React from "react";
import { TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <div className="py-16 px-4 mt-7">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Connecting Financial Goals with{" "}
          <span className="text-indigo-500">Investment Opportunities</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          The trusted peer-to-peer platform that empowers borrowers to secure
          funds and helps lenders grow their wealth through smart, transparent
          lending.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button className="bg-indigo-500 cursor-pointer hover:bg-indigo-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
            Apply for a Loan
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button className="border-2 border-indigo-600 cursor-pointer text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
            Start Investing
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="font-medium">Bank-level Security</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="font-medium">Competitive Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
