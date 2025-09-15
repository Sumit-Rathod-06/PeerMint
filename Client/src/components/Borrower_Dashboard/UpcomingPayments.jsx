// components/UpcomingPayments.jsx
import React from "react";

const UpcomingPayments = ({ payments }) => {
  const getStatusColor = (status) => {
    if (status === "Overdue") return "text-red-600";
    if (status === "Due Soon") return "text-orange-500";
    if (status === "Paid") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Payments</h2>
      <ul className="space-y-3">
        {payments.map((p, idx) => (
          <li key={idx} className="flex justify-between items-center border-b pb-2">
            <span>{p.date}</span>
            <span>₹{p.amount}</span>
            <span className={`font-semibold ${getStatusColor(p.status)}`}>
              {p.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingPayments;
