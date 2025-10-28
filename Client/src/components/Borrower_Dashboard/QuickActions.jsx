// components/QuickActions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex space-x-4">
        <button
          className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => navigate("/borrower/loan-application")}
        >
          Apply for Loan
        </button>
        <button
          className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => navigate("/borrower/repayment")}
        >
          Make a Payment
        </button>
        <button
          className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => navigate("/borrower/transaction-history")}
        >
          View Transaction History
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
