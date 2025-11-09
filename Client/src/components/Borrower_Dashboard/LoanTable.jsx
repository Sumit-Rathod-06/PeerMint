import React from "react";

const statusColor = {
  active: "text-green-600 bg-green-100",
  completed: "text-blue-600 bg-blue-100",
  defaulted: "text-red-600 bg-red-100",
  pending: "text-yellow-600 bg-yellow-100",
};

const LoanTable = ({ loans, onSelectLoan }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Loan ID</th>
            <th className="px-6 py-3 text-left font-semibold">Amount</th>
            <th className="px-6 py-3 text-left font-semibold">Interest Rate</th>
            <th className="px-6 py-3 text-left font-semibold">Tenure (months)</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-slate-50 transition cursor-pointer"
            >
              <td className="px-6 py-3">{loan.loan_id}</td>
              <td className="px-6 py-3">₹{loan.amount}</td>
              <td className="px-6 py-3">{loan.interest_rate}%</td>
              <td className="px-6 py-3">{loan.tenure}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColor[loan.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {loan.status}
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => onSelectLoan(loan)}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
