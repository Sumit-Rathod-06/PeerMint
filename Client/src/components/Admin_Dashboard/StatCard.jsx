import React from "react";
import { AlertCircle } from "lucide-react";
const StatCard = ({ title, value, subtitle, change, Icon }) => {
  return (
    <div className="bg-teal-50 shadow rounded-xl p-4 flex flex-col justify-between relative">
      <div className="absolute top-3 right-3 text-slate-600">
        <Icon   className="w-4 h-4" />
      </div>
      <p className="text-lg font-medium text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-4">{value}</h2>
      <p className="text-xs text-gray-500 mt-3">{subtitle}</p>
      <p className="text-xs text-green-600 font-semibold mt-1">{change}</p>
    </div>
  );
};

export default StatCard;
