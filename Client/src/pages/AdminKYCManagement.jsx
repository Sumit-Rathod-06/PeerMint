import { useState, useEffect } from "react";
import { Search, Filter, Calendar, Eye, X, Check } from "lucide-react";
import Header from "../components/Admin_Dashboard/Header";
import AdminSidebar from "../components/Admin_Dashboard/Sidebar";
import SubmissionList from "../components/Admin_Dashboard/SubmissionList";
import axios from "axios";
export default function KYCManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/admin/kyc"
          );
          const temp = res.data.data;
          setData(temp);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Page Header */}
        <header className="bg-white shadow">
          <Header />
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
          <SubmissionList submissions={data} refreshData={fetchData()} />
        </div>
      </div>
    </div>
  );
}
