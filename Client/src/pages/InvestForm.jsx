import React, { useState, useEffect } from "react";
import Header from "../components/Lender_Dashboard/Header";
import { Search, Filter, TrendingUp, CreditCard, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import BASE_URL from "../assets/assests"
import InvestModal from "../components/Lender_Dashboard/InvestModal";

const InvestForm = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [invested, setInvested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState({});

  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setOpen(true);
  };
  const token = localStorage.getItem("token");

  // Fetch from backend
// Inside InvestForm
const fetchLoans = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/lender/loan-applications`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched loan applications:", res.data);
    if (res.data.success) {
      const withRisk = res.data.applications.map((loan) => ({
        id: loan.application_id,
        name: loan.full_name,
        purpose: loan.purpose_of_loan,
        amount: Number(loan.loan_amount),
        estimatedemi : Number(loan.estimated_emi),
        totalAmount : Number(loan.total_amount),
        tenure: loan.loan_tenure,
        rate: loan.interest_rate,
        risk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        creditScore: 650 + Math.floor(Math.random() * 150),
      }));
      setLoanRequests(withRisk);
      setSummary(res.data.summary);
    }
  } catch (err) {
    console.error("Error fetching loans:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchLoans();
}, []);


  const filteredLoans = loanRequests.filter(
    (loan) =>
      (loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter === "All" || loan.risk === riskFilter)
  );

  const handleInvest = (loan) => {
    if (!invested.find((i) => i.id === loan.id)) {
      setInvested([...invested, loan]);
      alert(`✅ You invested in ${loan.name} for ₹${loan.amount}`);
    }
  };

  const handleAutoSuggest = () => {
    const best = loanRequests.reduce((max, l) => (l.creditScore > (max?.creditScore || 0) ? l : max), null);
    alert(`🤖 Best Match: ${best.name} (${best.purpose})`);
  };

  const barData = [
    { risk: "Low", count: loanRequests.filter((l) => l.risk === "Low").length },
    { risk: "Medium", count: loanRequests.filter((l) => l.risk === "Medium").length },
    { risk: "High", count: loanRequests.filter((l) => l.risk === "High").length },
  ];

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-[#5A189A] text-xl">
        ⏳ Loading loan applications...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f9f7ff] pt-24 px-6 md:px-10 lg:px-16 md:pl-72 transition-all relative">
      <Header />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E9D8FD] rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-[#5A189A]">Browse Loan Requests</h1>
          <p className="text-gray-500 mt-1">Explore verified borrowers and invest smartly.</p>
        </div>
        <button
          onClick={handleAutoSuggest}
          className="mt-4 md:mt-0 bg-[#7B1FA2] hover:bg-[#6A1B9A] text-white px-5 py-2 rounded-xl font-medium flex items-center gap-2 shadow-md"
        >
          <Sparkles size={18} /> Auto Suggest (AI)
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Invested", value: `₹${summary.total_interest_earned}`, icon: TrendingUp },
          { label: "Borrowers Available", value: loanRequests.length, icon: CreditCard },
          { label: "Intrest Earned", value: summary.total_interest_earned, icon: ArrowUpRight },
          { label: "Active Investments", value: summary.active, icon: Clock },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-[#E5D4FF] rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{card.label}</p>
              <card.icon size={18} className="text-[#7B1FA2]" />
            </div>
            <p className="text-2xl font-bold text-[#5A189A] mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-[#E5D4FF] rounded-2xl shadow-sm p-6 mb-10">
        <h2 className="text-lg font-semibold text-[#5A189A] mb-4">Risk Level Distribution</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="risk" />
            <Tooltip />
            <Bar dataKey="count" fill="#7B1FA2" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-[#E5D4FF] rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex items-center bg-[#F7F3FF] px-3 py-2 rounded-lg w-full md:w-96">
          <Search size={18} className="text-[#7B1FA2] mr-2" />
          <input
            type="text"
            placeholder="Search borrower or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={18} className="text-[#7B1FA2]" />
          <label className="text-gray-600 font-medium">Risk Level:</label>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="border border-[#E5D4FF] bg-white rounded-lg px-3 py-2 outline-none text-gray-700"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Borrower Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredLoans.map((loan) => (
          <motion.div
            key={loan.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-[#E5D4FF] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-[#5A189A]">{loan.name}</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  loan.risk === "Low"
                    ? "bg-green-100 text-green-700"
                    : loan.risk === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {loan.risk} Risk
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2">{loan.purpose}</p>
            <div className="space-y-1 text-gray-700 mb-4 text-sm">
              <p>💳 Credit Score: {loan.creditScore}</p>
              <p>🕒 Tenure: {loan.tenure}</p>
              <p>💰 Amount: ₹{loan.amount}</p>
            </div>
            <button
              className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-[#7B1FA2] to-[#9C27B0] text-white hover:shadow-lg"
              onClick={() => handleOpenModal(loan)}
            >
              View Details / Invest
            </button>

          </motion.div>
        ))}
      </div>
      <InvestModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loan={selectedLoan}
        onConfirm={() => {
          console.log("Investment confirmed for:", selectedLoan);
          setOpen(false);
        }}
        refreshLoans={fetchLoans}
      />
    </div>
  );
};

export default InvestForm;
