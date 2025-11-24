import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoanSummary from "./LoanSummary";
import UpcomingPayments from "./UpcomingPayments";
import NotificationsCard from "./NotificationsCard";
import QuickActions from "./QuickActions";

const Card1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch Borrower Dashboard Data (summary + kyc + payments + notifications)
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/borrower/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching borrower dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-700">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { kycStatus, totalLoanAmount, activeLoans, pendingEmis, totalRepaid, upcomingPayments, notifications } = data;

  // 🚦 Conditional Rendering based on KYC status
  if (kycStatus === "pending") {
    return (
      <div className="bg-slate-100 rounded-lg p-6">
        <div className="pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Complete Your Verification to Get Started
          </h1>
          <p className="text-gray-600">
            To apply for a loan, you first need to complete your KYC verification.
          </p>
        </div>

        <button
          className="bg-indigo-500 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors mb-5 mt-5"
          onClick={() => navigate("/borrower/kyc-form")}
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
          Your KYC documents were rejected. Please re-upload correct details to continue.
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
    const summary = {
      totalLoan: totalLoanAmount,
      activeLoans: activeLoans,
      pendingEmis: pendingEmis,
      totalRepaid: totalRepaid,
    };

    const formattedPayments = upcomingPayments.map((p) => ({
      date: new Date(p.due_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      amount: parseFloat(p.amount),
      status: p.payment_status,
    }));

    const notificationTexts = notifications.map((n) => n.message);

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
        <UpcomingPayments payments={formattedPayments} />
        <NotificationsCard notifications={notificationTexts} />
        <QuickActions />
      </div>
    );
  }

  // fallback
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
      Unknown KYC status. Please contact support.
    </div>
  );
};

export default Card1;
