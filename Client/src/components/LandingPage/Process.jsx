"use client"

import { useState } from "react"
import { CheckCircle, DollarSign, FileText, HandCoins, PiggyBank, TrendingUp, Users, Wallet } from "lucide-react"

const LendingBorrowingProcess = () => {
  const [activeProcess, setActiveProcess] = useState("lend")

  const lendingSteps = [
    { id: 1, title: "Registration", icon: <FileText className="w-5 h-5" /> },
    { id: 2, title: "Lender Profile Approval", icon: <CheckCircle className="w-5 h-5" /> },
    { id: 3, title: "View Loan Listing", icon: <Users className="w-5 h-5" /> },
    { id: 4, title: "Fund Loans", icon: <HandCoins className="w-5 h-5" /> },
    { id: 5, title: "Sign Agreement With Borrower", icon: <FileText className="w-5 h-5" /> },
    { id: 6, title: "Disbursement", icon: <Wallet className="w-5 h-5" /> },
    { id: 7, title: "EMI Profit Realization", icon: <TrendingUp className="w-5 h-5" /> },
    { id: 8, title: "Further Re-lending", icon: <PiggyBank className="w-5 h-5" /> },
  ]

  const borrowingSteps = [
    { id: 1, title: "Registration", icon: <FileText className="w-5 h-5" /> },
    { id: 2, title: "Profile Evaluation", icon: <CheckCircle className="w-5 h-5" /> },
    { id: 3, title: "Listing On Platform", icon: <DollarSign className="w-5 h-5" /> },
    { id: 4, title: "Funding", icon: <HandCoins className="w-5 h-5" /> },
    { id: 5, title: "Sign Agreement With Lender", icon: <FileText className="w-5 h-5" /> },
    { id: 6, title: "Disbursement", icon: <Wallet className="w-5 h-5" /> },
    { id: 7, title: "EMI Repayment", icon: <TrendingUp className="w-5 h-5" /> },
    { id: 8, title: "Loan Closure", icon: <CheckCircle className="w-5 h-5" /> },
  ]

  const currentSteps = activeProcess === "lend" ? lendingSteps : borrowingSteps

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">How Do I Get Started?</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-14">
          <button
            onClick={() => setActiveProcess("lend")}
            className={`cursor-pointer group relative overflow-hidden rounded-xl px-12 py-2 font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
              activeProcess === "lend"
                ? "bg-indigo-500 text-white shadow-2xl scale-105"
                : "bg-indigo-400 text-white shadow-lg hover:bg-indigo-500"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 opacity-100" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-lg font-black text-white">LEND MONEY</div>
              <div className="text-indigo-100 text-sm font-medium">Get High Returns</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-cyan-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => setActiveProcess("borrow")}
            className={`cursor-pointer group relative overflow-hidden rounded-xl px-12 py-2 font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
              activeProcess === "borrow"
                ? "bg-purple-500 text-white shadow-2xl scale-105"
                : "bg-purple-400 text-white shadow-lg hover:bg-purple-500"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-100" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-lg font-black text-white">BORROW MONEY</div>
              <div className="text-purple-100 text-sm font-medium">Get Lower Rates</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-teal-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </button>
        </div>

        {/* Process Steps */}
        {activeProcess && (
          <div className="animate-fade-in">
            {/* Steps Container - Single Row */}
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full hidden lg:block" />

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-4">
                {currentSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative group transition-all duration-700 delay-${index * 100} animate-slide-up`}
                  >
                    {/* Step Card */}
                    <div
                      className={`h-30 relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                        activeProcess === "lend"
                          ? "border-indigo-100 hover:border-indigo-300"
                          : "border-purple-100 hover:border-purple-300"
                      }`}
                    >
                      {/* Step Number */}
                      <div
                        className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                          activeProcess === "lend"
                            ? "bg-gradient-to-r from-indigo-300 to-indigo-500"
                            : "bg-gradient-to-r from-purple-300 to-purple-500"
                        }`}
                      >
                        {step.id}
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                          activeProcess === "lend" ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xs font-semibold text-gray-800 leading-tight">{step.title}</h3>
                    </div>

                    {/* Animated Progress Dot */}
                    <div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                        activeProcess === "lend" ? "bg-indigo-400" : "bg-purple-400"
                      } opacity-0 animate-bounce-in hidden lg:block`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default LendingBorrowingProcess
