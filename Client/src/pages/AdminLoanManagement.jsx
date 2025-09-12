import { useState } from "react";
import { Search, Filter, Calendar, Eye, X, Check } from "lucide-react";
import Header from '../components/Admin_Dashboard/Header'
import AdminSidebar from "../components/Admin_Dashboard/Sidebar"; // ✅ import your sidebar
import LoanList from "../components/Admin_Dashboard/LoanList";
export default function LoanManagement() {
  const [search, setSearch] = useState("");

  const loanApplications = [
    {
        id: 1,
        applicant: "Rajesh Mehta",
        loanId: "LOAN001",
        email: "rajesh.mehta@email.com",
        amount: "₹5,00,000",
        tenure: "24 months",
        purpose: "Business Expansion",
        applied: "15 Jan 2024, 04:00 pm",
        status: "Pending",
    },
    {
        id: 2,
        applicant: "Kavya Singh",
        loanId: "LOAN002",
        email: "kavya.singh@email.com",
        amount: "₹2,50,000",
        tenure: "18 months",
        purpose: "Home Renovation",
        applied: "14 Jan 2024, 07:50 pm",
        status: "Approved",
    },
    {
        id: 3,
        applicant: "Arjun Reddy",
        loanId: "LOAN003",
        email: "arjun.reddy@email.com",
        amount: "₹7,50,000",
        tenure: "36 months",
        purpose: "Debt Consolidation",
        applied: "10 Jan 2024, 10:15 pm",
        status: "Active",
    },
    {
        id: 4,
        applicant: "Meera Joshi",
        loanId: "LOAN004",
        email: "meera.joshi@email.com",
        amount: "₹3,00,000",
        tenure: "12 months",
        purpose: "Medical Emergency",
        applied: "13 Jan 2024, 05:45 pm",
        status: "Rejected",
    },
    ];


  return (
    <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Page Header */}
                <header className="bg-white shadow">
                    <Header/>
                </header>
            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-600">Loan Management</h1>
                <p className="text-gray-600 mb-6">
                    Review loan application and manage active loans
                </p>

                {/* Search & Filter */}
                <div className="bg-teal-50 p-4 rounded-lg flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2 flex-1">
                    <Search size={18} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name, user ID, or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-gray-600 text-sm">
                    <Filter size={16} />
                    All Status
                    </button>
                </div>

                {/* Submissions List */}
                <LoanList submissions={loanApplications} />
            </div>
        </div>
    </div>
  );
}
