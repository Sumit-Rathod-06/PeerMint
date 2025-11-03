import { Users, UserCheck, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../assets/assests";
export default function StatCards() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/dashboard`);
        const json = await res.json();
        if (json.success) {
          setSummary(json.data);
        } else {
          console.error("Failed to fetch summary:", json.message);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading stats...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: summary.totalUsers , icon: <Users size={28} /> },
    { label: "Total Borrowers", value: summary.totalBorrowers, icon: <UserCheck size={28} />},
    { label: "Total Lenders", value: summary.totalLenders, icon: <TrendingUp size={28} />},
    { label: "Pending KYCs", value: summary.pendingKyc, icon: <Clock size={28} />},
    { label: "Blocked Users", value: summary.blockedUsers, icon: <AlertTriangle size={28} />},
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {stats.map((item, i) => (
        <div key={i} className={`bg-gray-100 px-5 py-4 rounded-xl shadow-lg flex justify-between items-center`}>
          <div>
            <p className="text-sm opacity-90">{item.label}</p>
            <h2 className="text-3xl font-bold">{item.value}</h2>
          </div>
          {item.icon}
        </div>
      ))}
    </div>
  );
}
