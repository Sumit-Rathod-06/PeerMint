import { useState } from "react";
import { Search, Filter, Calendar, Eye, X, Check } from "lucide-react";
import Header from '../components/Admin_Dashboard/Header'
import AdminSidebar from "../components/Admin_Dashboard/Sidebar"; // ✅ import your sidebar
import SubmissionList from "../components/Admin_Dashboard/SubmissionList";
export default function KYCManagement() {
  const [search, setSearch] = useState("");

  const submissions = [
    {
      id: 1,
      name: "Rahul Sharma",
      userId: "USR2847",
      email: "rahul.sharma@email.com",
      submitted: "15 Jan 2024, 04:00 pm",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patel",
      userId: "USR2848",
      email: "priya.patel@email.com",
      submitted: "14 Jan 2024, 07:50 pm",
      status: "Approved",
    },
    {
      id: 3,
      name: "Amit Kumar",
      userId: "USR2849",
      email: "amit.kumar@email.com",
      submitted: "13 Jan 2024, 10:15 pm",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Sneha Verma",
      userId: "USR2850",
      email: "sneha.verma@email.com",
      submitted: "12 Jan 2024, 03:20 pm",
      status: "Pending",
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
                <h1 className="text-3xl font-bold text-gray-600">KYC Management</h1>
                <p className="text-gray-600 mb-6">
                    Review and manage user identity verification submissions
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
                <SubmissionList submissions={submissions} />
            </div>
        </div>
    </div>
  );
}
