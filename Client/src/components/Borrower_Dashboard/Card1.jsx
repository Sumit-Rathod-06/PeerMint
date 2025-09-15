import React from "react";
import { useNavigate } from "react-router-dom";
import LoanSummary from "./LoanSummary";
import UpcomingPayments from "./UpcomingPayments";
import NotificationsCard from "./NotificationsCard";
import QuickActions from "./QuickActions";
const Card1 = () => {
  const navigate = useNavigate();
  const summary = {
    totalLoan: 50000,
    activeLoans: 2,
    pendingEmis: 3,
    totalRepaid: 20000,
  };

  const payments = [
    { date: "15 Sep 2025", amount: 5000, status: "Due Soon" },
    { date: "10 Aug 2025", amount: 5000, status: "Paid" },
    { date: "10 Jul 2025", amount: 5000, status: "Overdue" },
  ];

  const notifications = [
    "Your EMI for Loan #12345 is due on 15th Sep.",
    "Your loan application #98765 was approved.",
    "KYC verification pending.",
  ];
  return (
    <div className="bg-slate-100 rounded-lg mt-18">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Complete Your Verification to Get Started</h1>
        <p className="text-gray-600">To apply for a loan, you first need to complete your KYC (Know Your
          Customer) verification. It's a secure and simple process.</p>
      </div>
      
      

        <button className="bg-indigo-400 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors mb-5 mt-5" onClick={() => {navigate('/borrower/kyc-form')}}>
          Start KYC Verification
        </button>
        <LoanSummary summary={summary} />
      <UpcomingPayments payments={payments} />
      <NotificationsCard notifications={notifications} />
      <QuickActions />
    </div>
    
  );
};

export default Card1;
