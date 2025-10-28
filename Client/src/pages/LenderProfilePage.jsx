import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  User,
  CheckCircle,
  Wallet,
  TrendingUp,
  CreditCard,
  Bell,
  Shield,
  Edit,
  X,
} from "lucide-react";

const LenderProfilePage = () => {
  const [autoInvest, setAutoInvest] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("Prinka Devi");
  const [email, setEmail] = useState("prinkadevi2801@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");

  const pieData = [
    { name: "Low Risk", value: 45 },
    { name: "Medium Risk", value: 35 },
    { name: "High Risk", value: 20 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  const recentActivities = [
    "Invested ₹10,000 in Loan #1001",
    "Received ₹350 in interest (Loan #984)",
    "Withdrew ₹5,000 to bank account",
    "Auto-invested ₹8,000 in Low Risk loan",
  ];

  const handleSaveProfile = () => {
    setShowEditModal(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-white to-violet-50 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
        >
          <Edit size={18} /> Edit Profile
        </button>
      </div>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-violet-100 rounded-full">
              <User className="text-violet-600" size={30} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
              <p className="text-gray-500 text-sm">Member since June 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-green-600 font-medium">
            <CheckCircle size={18} /> KYC Verified
          </div>
          <p className="text-gray-600 mt-4">
            Email: <span className="font-medium">{email}</span>
          </p>
          <p className="text-gray-600">
            Phone: <span className="font-medium">{phone}</span>
          </p>
        </motion.div>

        {/* Investment Summary */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <TrendingUp size={20} /> Investment Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Total Invested</p>
              <p className="text-xl font-bold text-violet-700">₹85,000</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Returns</p>
              <p className="text-xl font-bold text-green-600">₹12,800</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Investments</p>
              <p className="text-lg font-semibold">7</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg ROI</p>
              <p className="text-lg font-semibold text-violet-600">14.5%</p>
            </div>
          </div>
        </motion.div>

        {/* Wallet Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <Wallet size={20} /> Wallet Summary
          </h2>
          <p className="text-gray-600 mb-1">
            Balance: <span className="font-bold text-green-600">₹14,500</span>
          </p>
          <p className="text-gray-500 text-sm mb-3">
            Last Transaction: <span className="text-gray-700">₹5,000 withdrawn</span>
          </p>
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
              Add Funds
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Withdraw
            </button>
          </div>
        </motion.div>
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Portfolio Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <CreditCard size={20} /> Risk Distribution
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 col-span-2"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Bell size={20} /> Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <li
                key={idx}
                className="bg-violet-50 border border-violet-100 rounded-lg p-3 text-gray-700 hover:bg-violet-100 transition"
              >
                {activity}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Auto-Invest Section */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white mt-8 rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <Shield className="text-violet-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Auto-Invest Settings
            </h3>
            <p className="text-gray-500 text-sm">
              Let PeerMint auto-invest your balance into matching loans.
            </p>
          </div>
        </div>
        <button
          onClick={() => setAutoInvest(!autoInvest)}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-lg font-medium transition ${
            autoInvest
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {autoInvest ? "Enabled ✅" : "Disabled ❌"}
        </button>
      </motion.div>

      {/* ✨ Edit Profile Modal ✨ */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 shadow-2xl w-96 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LenderProfilePage;
