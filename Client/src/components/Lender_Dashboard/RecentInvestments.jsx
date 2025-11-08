import React from "react";

const RecentInvestments = () => {
  const data = [
    { name: "Anita Sharma", amount: "₹25,000", interest: "10%", status: "Ongoing" },
    { name: "Ravi Kumar", amount: "₹15,000", interest: "12%", status: "Completed" },
    { name: "Neha Singh", amount: "₹10,000", interest: "11%", status: "Ongoing" },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Investments</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 text-sm border-b">
            <th className="pb-2">Borrower</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Interest</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b text-sm">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.amount}</td>
              <td className="py-2">{item.interest}</td>
              <td
                className={`py-2 font-medium ${
                  item.status === "Completed" ? "text-green-600" : "text-blue-600"
                }`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentInvestments;
