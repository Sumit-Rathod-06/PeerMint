// components/LoanSummary.jsx
import React from "react";

const LoanSummary = ({ summary }) => {
  const items = [
    { title: "Total Loan Amount", value: `₹${summary.totalLoan}` },
    { title: "Active Loans", value: summary.activeLoans },
    { title: "Pending EMIs", value: summary.pendingEmis },
    { title: "Total Repaid", value: `₹${summary.totalRepaid}` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
          <p className="text-2xl font-bold text-indigo-700">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanSummary;
