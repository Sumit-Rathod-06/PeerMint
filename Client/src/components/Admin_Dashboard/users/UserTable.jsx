import React, { useEffect, useState } from "react";
import { Eye, Lock, X, Trash2, Check } from "lucide-react";
import BASE_URL from "../../../assets/assests"; // adjust path if needed


export default function UserTable({ userType, search, kycFilter, accountFilter, dateFilter }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch both borrowers and lenders from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [borrowerRes, lenderRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/borrowers`),
          fetch(`${BASE_URL}/api/admin/lenders`)
        ]);

        const borrowerJson = await borrowerRes.json();
        const lenderJson = await lenderRes.json();

        const borrowerData = borrowerJson.success ? borrowerJson.data.map(b => ({
          id: `BRW${b.borrower_id}`,
          type: "borrowers",
          name: b.first_name + " " + b.last_name,
          email: b.email,
          mobile: b.phone_number,
          kyc: b.kyc_status || "Pending",
          account: b.blocked ? "Blocked" : "Active",
          created: new Date(b.created_at).toISOString().split("T")[0],
        })) : [];

        const lenderData = lenderJson.success ? lenderJson.data.map(l => ({
          id: `LND${l.lender_id}`,
          type: "lenders",
          name: l.first_name + " " + l.last_name,
          email: l.email,
          mobile: l.phone_number,
          kyc: l.kyc_status || "Pending",
          account: l.blocked ? "Blocked" : "Active",
          created: new Date(l.created_at).toISOString().split("T")[0],
        })) : [];

        setUsers([...borrowerData, ...lenderData]);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Filter logic
  const filteredUsers = users
    .filter((u) => u.type === userType)
    .filter((u) =>
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => kycFilter === "All" || u.kyc === kycFilter)
    .filter((u) => accountFilter === "All" || u.account === accountFilter)
    .filter((u) => dateFilter === "All" || u.created.startsWith(dateFilter));

  const getBadge = (status) => {
    const colors = {
      Approved: "bg-green-700",
      Pending: "bg-yellow-600",
      Rejected: "bg-red-700",
      Active: "bg-green-700",
      Blocked: "bg-red-700",
    };
    return (
      <span className={`${colors[status] || "bg-gray-500"} px-3 py-1 rounded-md text-xs text-white`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-5 text-gray-500">Loading users...</div>;
  }

  return (
    <table className="w-full text-sm">
      <thead className="text-black text-left border-b border-gray-700">
        <tr>
          <th className="py-3">User ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>KYC</th>
          <th>Account</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-100">
              <td className="py-3">{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{getBadge(user.kyc)}</td>
              <td>{getBadge(user.account)}</td>
              <td>{user.created}</td>
              <td className="flex gap-2 py-2">
                <Eye className="cursor-pointer" size={18} />
                <Check className="cursor-pointer text-green-500" size={18} />
                <X className="cursor-pointer text-yellow-500" size={18} />
                <Trash2 className="cursor-pointer text-red-500" size={18} />
                <Lock className="cursor-pointer text-red-400" size={18} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4 text-gray-500">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
