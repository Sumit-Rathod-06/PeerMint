import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoanSummary from "./LoanSummary";
import UpcomingPayments from "./UpcomingPayments";
import NotificationsCard from "./NotificationsCard";
import QuickActions from "./QuickActions";

const Card1 = () => {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // 🧠 Fetch KYC status from backend
  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/borrower/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKycStatus(res.data.kyc_status);
      } catch (err) {
        console.error("Error fetching borrower data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKycStatus();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // 🚦 Conditional Rendering based on KYC status
  if (kycStatus === "pending") {
    return (
      <div className="bg-slate-100 rounded-lg p-6">
        <div className="pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Complete Your Verification to Get Started
          </h1>
          <p className="text-gray-600">
            To apply for a loan, you first need to complete your KYC (Know Your
            Customer) verification. It's a secure and simple process.
          </p>
        </div>

        <button
          className="bg-indigo-500 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors mb-5 mt-5"
          onClick={() => {
            navigate("/borrower/kyc-form");
          }}
        >
          Start KYC Verification
        </button>

        <div className="mt-4 text-sm text-gray-500">
          <em>Your KYC status is currently pending verification.</em>
        </div>
      </div>
    );
  }

  if (kycStatus === "rejected") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
        <h1 className="text-2xl font-semibold mb-2">KYC Rejected ❌</h1>
        <p className="text-gray-700">
          Your KYC documents were rejected. Please re-upload correct details to
          continue.
        </p>
        <button
          className="bg-red-500 text-white px-6 py-3 mt-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
          onClick={() => navigate("/borrower/kyc-form")}
        >
          Re-upload KYC Documents
        </button>
      </div>
    );
  }

  if (kycStatus === "approved") {
    return (
      <div className="bg-slate-100 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back 👋
          </h1>
          <span className="text-green-600 text-sm font-semibold">
            ✅ KYC Verified
          </span>
        </div>

        <LoanSummary summary={summary} />
        <UpcomingPayments payments={payments} />
        <NotificationsCard notifications={notifications} />
        <QuickActions />
      </div>
    );
  }

  // fallback for unexpected status
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
      Unknown KYC status. Please contact support.
    </div>
  );
};

export default Card1;
