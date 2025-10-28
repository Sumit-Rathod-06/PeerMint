import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

const LenderDashboardPage = () => {
  const COLORS = ["#16a34a", "#3b82f6", "#f59e0b"];

  const riskData = [
    { name: "Low Risk", value: 50 },
    { name: "Medium Risk", value: 30 },
    { name: "High Risk", value: 20 },
  ];

  const earningsData = [
    { month: "Jul", returns: 2500 },
    { month: "Aug", returns: 2800 },
    { month: "Sep", returns: 3100 },
    { month: "Oct", returns: 3400 },
    { month: "Nov", returns: 3700 },
  ];

  const transactions = [
    { date: "Oct 01, 2025", action: "Invested", amount: "₹10,000", status: "Success" },
    { date: "Oct 10, 2025", action: "Interest Received", amount: "₹500", status: "Success" },
    { date: "Oct 20, 2025", action: "Withdrawn", amount: "₹2,000", status: "Pending" },
  ];

  const printReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800 print:bg-white">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-200 print:shadow-none print:border-0">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">PeerMint Lender Dashboard</h1>
            <p className="text-sm text-gray-500">lender@peermint.com</p>
          </div>
          <button
            onClick={printReport}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition print:hidden"
          >
            <Printer size={18} />
            Print Report
          </button>
        </div>

        {/* BASIC DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Wallet Balance</h3>
            <p className="text-4xl font-bold mt-2">₹14,500</p>
            <p className="text-sm mt-1 opacity-90">Next Payout: ₹2,500 on Nov 10, 2025</p>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-800">Overall Portfolio Health</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">Stable</p>
            <p className="text-sm text-gray-600">Default Risk: <b>4.5%</b></p>
          </div>
        </div>

        {/* PORTFOLIO INSIGHTS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">
            Portfolio Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={riskData} outerRadius={90} label>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <p><b>Average Interest Rate:</b> 11.2%</p>
              <p><b>Total Interest Earned:</b> ₹3,200</p>
              <p><b>Invested Sectors:</b> Education, Healthcare, Retail</p>
            </div>
          </div>
        </section>

        {/* EARNINGS TIMELINE */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">
            Earnings Timeline
          </h2>
          <div className="bg-gray-100 p-4 rounded-xl">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="returns" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* TRANSACTION HISTORY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">
            Investment History
          </h2>
          <motion.table
            className="min-w-full text-left border border-gray-200 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{t.date}</td>
                  <td className="py-3 px-4">{t.action}</td>
                  <td className="py-3 px-4">{t.amount}</td>
                  <td className={`py-3 px-4 font-medium ${t.status === "Success" ? "text-green-600" : "text-yellow-500"}`}>
                    {t.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </section>

        {/* SMART SUGGESTIONS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">
            Smart Suggestions
          </h2>
          <div className="p-6 bg-violet-50 border border-violet-200 rounded-xl">
            <p className="mb-3 text-gray-700">
              We found <b>3 low-risk borrowers</b> matching your investment history.
            </p>
            <button className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 transition">
              View Suggestions
            </button>
          </div>
        </section>

        {/* FOOTER SIGNATURE */}
        <div className="border-t pt-4 mt-8 text-center text-sm text-gray-500">
          <p>PeerMint Financial Services</p>
          <p className="mt-2 italic">Authorized Signature: _____________________</p>
          <p className="mt-4 text-xs text-gray-400 print:hidden">
            © 2025 PeerMint | lender@peermint.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default LenderDashboardPage;
