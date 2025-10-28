import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Search, PlusCircle, Sun, Moon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Lender_Dashboard/Header"; // ✅ Header imported

export default class Investment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      showForm: false,
      search: "",
      filterStatus: "All",
      sortBy: "None",
      investments: [
        { id: 1, borrower: "Amit Sharma", amount: 50000, roi: 10, status: "Active", tenure: 12 },
        { id: 2, borrower: "Priya Patel", amount: 100000, roi: 12, status: "Completed", tenure: 24 },
        { id: 3, borrower: "Ravi Kumar", amount: 75000, roi: 11, status: "Active", tenure: 18 },
        { id: 4, borrower: "Neha Verma", amount: 30000, roi: 9, status: "Completed", tenure: 6 },
        { id: 5, borrower: "Vikram Singh", amount: 150000, roi: 13, status: "Active", tenure: 36 },
      ],
      newInvestment: { borrower: "", amount: "", roi: "", tenure: "", status: "Active" },
    };
  }

  getFilteredInvestments() {
    const { investments, search, filterStatus, sortBy } = this.state;
    let filtered = investments.filter(
      (inv) =>
        inv.borrower.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "All" || inv.status === filterStatus)
    );

    if (sortBy === "Amount") filtered.sort((a, b) => b.amount - a.amount);
    if (sortBy === "ROI") filtered.sort((a, b) => b.roi - a.roi);
    if (sortBy === "Tenure") filtered.sort((a, b) => b.tenure - a.tenure);

    return filtered;
  }

  handleAddInvestment = () => {
    const { borrower, amount, roi, tenure, status } = this.state.newInvestment;
    if (!borrower || !amount || !roi || !tenure) {
      toast.error("Please fill all fields!");
      return;
    }
    this.setState((prev) => ({
      investments: [
        ...prev.investments,
        {
          id: prev.investments.length + 1,
          borrower,
          amount: Number(amount),
          roi: Number(roi),
          tenure: Number(tenure),
          status,
        },
      ],
      showForm: false,
      newInvestment: { borrower: "", amount: "", roi: "", tenure: "", status: "Active" },
    }));
    toast.success("Investment added successfully!");
  };

  render() {
    const { darkMode, investments, search, filterStatus, sortBy, showForm, newInvestment } =
      this.state;

    const filteredInvestments = this.getFilteredInvestments();
    const total = investments.reduce((acc, i) => acc + i.amount, 0);
    const active = investments.filter((i) => i.status === "Active").length;
    const completed = investments.filter((i) => i.status === "Completed").length;
    const defaulted = investments.filter((i) => i.status === "Defaulted").length;

    const pieData = [
      { name: "Active", value: active },
      { name: "Completed", value: completed },
      { name: "Defaulted", value: defaulted },
    ];
    const COLORS = ["#7B1FA2", "#34D399", "#EF4444"];

    const barData = investments.map((inv) => ({
      name: inv.borrower,
      ROI: inv.roi,
      Amount: inv.amount / 1000,
    }));

    return (
      <div
        className={`min-h-screen flex flex-col transition-all duration-500 ${
          darkMode ? "bg-[#f8f3ff]" : "bg-gradient-to-br from-[#faf5ff] to-[#f4ecff]"
        }`}
      >
        <Header /> {/* ✅ Header sticks on top */}

        <Toaster position="top-center" />

        <main className="flex-1 w-full px-6 md:px-10 lg:px-14 pt-24">
          {/* HEADER SECTION */}
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl md:text-4xl font-extrabold ${
                darkMode ? "text-[#5B138B]" : "text-[#6A1B9A]"
              }`}
            >
              💼 My Investments
            </h1>
            <button
              onClick={() => this.setState({ darkMode: !darkMode })}
              className="p-2 bg-white rounded-full shadow-md border hover:scale-105 transition-all"
            >
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-[#6A1B9A]" />}
            </button>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Invested", value: `₹${total.toLocaleString()}`, color: "text-[#6A1B9A]" },
              { label: "Active", value: active, color: "text-[#7B1FA2]" },
              { label: "Completed", value: completed, color: "text-green-600" },
              { label: "Defaulted", value: defaulted, color: "text-red-500" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl border border-[#E5D4FF] transition-all"
              >
                <p className="text-gray-500 text-sm">{card.label}</p>
                <h3 className={`text-2xl font-bold ${card.color}`}>{card.value}</h3>
              </div>
            ))}
          </div>

          {/* ANALYTICS */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#E5D4FF]">
              <h3 className="text-lg font-semibold mb-4 text-[#6A1B9A]">Investment Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#E5D4FF]">
              <h3 className="text-lg font-semibold mb-4 text-[#6A1B9A]">ROI vs Amount (₹K)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Amount" fill="#7B1FA2" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="ROI" fill="#34D399" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow-sm w-full md:w-1/2 border border-[#E5D4FF]">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by borrower name..."
                value={search}
                onChange={(e) => this.setState({ search: e.target.value })}
                className="outline-none text-sm w-full bg-transparent pl-2"
              />
            </div>

            <div className="flex gap-3 justify-end">
              {["filterStatus", "sortBy"].map((type, i) => (
                <select
                  key={i}
                  value={this.state[type]}
                  onChange={(e) => this.setState({ [type]: e.target.value })}
                  className="px-4 py-2 border border-[#E5D4FF] rounded-xl bg-[#faf5ff] text-[#6A1B9A] text-sm font-medium shadow-sm hover:border-[#7B1FA2] transition-all"
                >
                  {type === "filterStatus" ? (
                    <>
                      <option>All</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Defaulted</option>
                    </>
                  ) : (
                    <>
                      <option>None</option>
                      <option>Amount</option>
                      <option>ROI</option>
                      <option>Tenure</option>
                    </>
                  )}
                </select>
              ))}
            </div>
          </div>

          {/* INVESTMENT TABLE */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#E5D4FF] overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#F2E7FF] text-[#6A1B9A] text-sm uppercase">
                <tr>
                  {["Borrower", "Amount", "ROI", "Tenure", "Status"].map((head) => (
                    <th key={head} className="py-4 px-6 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E6FF] text-sm">
                {filteredInvestments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#f7f0ff] transition-all">
                    <td className="py-4 px-6 font-medium text-gray-800">{inv.borrower}</td>
                    <td className="py-4 px-6 text-gray-700">₹{inv.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-700">{inv.roi}%</td>
                    <td className="py-4 px-6 text-gray-700">{inv.tenure} mo</td>
                    <td
                      className={`py-4 px-6 font-medium ${
                        inv.status === "Active"
                          ? "text-[#7B1FA2]"
                          : inv.status === "Completed"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {inv.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => this.setState({ showForm: true })}
            className="fixed bottom-10 right-10 bg-[#7B1FA2] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#6A1B9A] transition-all"
          >
            <PlusCircle size={20} /> Add Investment
          </button>

          {/* ADD FORM (Modern Popup) */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white rounded-3xl p-8 w-[90%] md:w-[420px] shadow-2xl relative">
                <h2 className="text-2xl font-bold text-[#6A1B9A] mb-6 text-center">
                  ➕ New Investment
                </h2>
                {["borrower", "amount", "roi", "tenure"].map((field) => (
                  <input
                    key={field}
                    type={field === "borrower" ? "text" : "number"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newInvestment[field]}
                    onChange={(e) =>
                      this.setState({
                        newInvestment: { ...newInvestment, [field]: e.target.value },
                      })
                    }
                    className="w-full mb-4 px-4 py-2.5 border border-[#E5D4FF] rounded-xl text-sm focus:border-[#7B1FA2] outline-none"
                  />
                ))}
                <select
                  value={newInvestment.status}
                  onChange={(e) =>
                    this.setState({
                      newInvestment: { ...newInvestment, status: e.target.value },
                    })
                  }
                  className="w-full mb-5 px-4 py-2.5 border border-[#E5D4FF] rounded-xl text-sm bg-[#faf5ff] text-[#6A1B9A]"
                >
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Defaulted</option>
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => this.setState({ showForm: false })}
                    className="px-5 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={this.handleAddInvestment}
                    className="px-5 py-2 bg-[#7B1FA2] text-white rounded-lg hover:bg-[#6A1B9A] transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
