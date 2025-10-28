import React from "react";

const Card1 = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-gray-500 text-sm font-medium">Total Invested</h3>
      <p className="text-3xl font-semibold text-blue-600 mt-2">₹1,20,000</p>
      <p className="text-green-500 text-sm mt-1">↑ 8% from last month</p>
    </div>
  );
};

export default Card1;
