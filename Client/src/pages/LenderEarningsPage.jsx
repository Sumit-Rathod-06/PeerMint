import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Clock,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LenderEarningsPage = () => {
  // Mock monthly data
  const earningsData = [
    { month: "Jan", earnings: 3200 },
    { month: "Feb", earnings: 4500 },
    { month: "Mar", earnings: 3800 },
    { month: "Apr", earnings: 5200 },
    { month: "May", earnings: 6100 },
    { month: "Jun", earnings: 7200 },
    { month: "Jul", earnings: 6800 },
    { month: "Aug", earnings: 7900 },
    { month: "Sep", earnings: 8500 },
    { month: "Oct", earnings: 9100 },
  ];

  const transactions = [
    {
      id: "TXN1021",
      type: "EMI Received",
      amount: "₹1,200",
      date: "Oct 25, 2025",
      status: "Success",
    },
    {
      id: "TXN1020",
      type: "Investment Return",
      amount: "₹800",
      date: "Oct 21, 2025",
      status: "Success",
    },
    {
      id: "TXN1019",
      type: "EMI Pending",
      amount: "₹1,500",
      date: "Oct 20, 2025",
      status: "Pending",
    },
    {
      id: "TXN1018",
      type: "Withdrawal",
      amount: "₹3,000",
      date: "Oct 18, 2025",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-white to-violet-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Earnings Dashboard</h1>
        <p className="text-gray-500 mt-2 md:mt-0">
          Track your performance and earnings at a glance
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Expected Returns */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-violet-600" size={26} />
            <h2 className="text-lg font-semibold text-gray-700">
              Expected Total Returns
            </h2>
          </div>
          <p className="text-3xl font-bold text-violet-700">₹1,25,400</p>
          <p className="text-gray-500 text-sm mt-1">
            Based on your current investments
          </p>
        </motion.div>

        {/* EMI Received */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <ArrowUpCircle className="text-green-600" size={26} />
            <h2 className="text-lg font-semibold text-gray-700">EMI Received</h2>
          </div>
          <p className="text-3xl font-bold text-green-700">₹42,800</p>
          <p className="text-gray-500 text-sm mt-1">
            Till October 2025
          </p>
        </motion.div>

        {/* Pending EMI */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-amber-500" size={26} />
            <h2 className="text-lg font-semibold text-gray-700">Pending EMI</h2>
          </div>
          <p className="text-3xl font-bold text-amber-600">₹7,500</p>
          <p className="text-gray-500 text-sm mt-1">2 loans due this month</p>
        </motion.div>
      </div>

      {/* Earnings Chart */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white mt-10 rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Wallet className="text-violet-600" size={20} /> Monthly Earnings Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white mt-10 rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CreditCard className="text-violet-600" size={20} /> Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-100 text-violet-700 text-sm">
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-violet-50 text-gray-700 text-sm border-b"
                >
                  <td className="p-3">{txn.id}</td>
                  <td className="p-3">{txn.type}</td>
                  <td className="p-3 font-medium">{txn.amount}</td>
                  <td className="p-3">{txn.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      txn.status === "Pending"
                        ? "text-amber-600"
                        : "text-green-600"
                    }`}
                  >
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Smart Insights */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-violet-600 mt-10 rounded-2xl shadow-lg p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <Info size={24} className="text-white" />
          <div>
            <h3 className="text-lg font-semibold">Smart Investment Insight</h3>
            <p className="text-sm text-violet-100">
              Your highest returns are from Low Risk loans (ROI: 15%). Consider reinvesting ₹10,000
              from wallet to maintain consistent growth.
            </p>
          </div>
        </div>
        <button className="bg-white text-violet-700 px-5 py-2 rounded-lg font-semibold hover:bg-violet-100 transition">
          Reinvest Now
        </button>
      </motion.div>
    </div>
  );
};

export default LenderEarningsPage;
