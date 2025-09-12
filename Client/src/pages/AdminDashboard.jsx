import React from "react";
import AdminSidebar from "../components/Admin_Dashboard/Sidebar"; // ✅ import your sidebar
import StatCard from "../components/Admin_Dashboard/StatCard";
import TableCard from "../components/Admin_Dashboard/TableCard";
import Header from '../components/Admin_Dashboard/Header'
import { AlertCircle, Users, DollarSign, Wallet2 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* If you have a Navbar, add it here */}
        <header className="bg-white shadow">
          <Header/>
        </header>

        {/* Page Content */}
        <main className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-600">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor platform activities and manage pending actions</p>
            </div>
          {/* Top Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Pending Actions"
              value="12"
              subtitle="KYC + Loan applications"
              change="+2 from yesterday"
              Icon={AlertCircle}
            />
            <StatCard
              title="Total Users"
              value="2,847"
              subtitle="Registered users"
              change="+12% from last month"
              Icon={Users}
            />
            <StatCard
              title="Active Loans"
              value="₹45.2L"
              subtitle="156 active loans"
              change="+8% from last month"
              Icon={Wallet2}
            />
            <StatCard
              title="Total Disbursed"
              value="₹2.4Cr"
              subtitle="Lifetime disbursements"
              change="+15% from last month"
              Icon={DollarSign}
            />
          </div>

          {/* Bottom Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending KYC Verifications */}
            <TableCard
              title="Pending KYC Verifications"
              count={4}
              columns={["User", "Submitted", "Action"]}
              data={[
                [
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-xs text-gray-500">USR2847</p>
                  </div>,
                  "2024-01-15",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Priya Patel</p>
                    <p className="text-xs text-gray-500">USR2848</p>
                  </div>,
                  "2024-01-15",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Amit Kumar</p>
                    <p className="text-xs text-gray-500">USR2849</p>
                  </div>,
                  "2024-01-14",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Sneha Gupta</p>
                    <p className="text-xs text-gray-500">USR2850</p>
                  </div>,
                  "2024-01-14",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
              ]}
            />

            {/* Pending Loan Applications */}
            <TableCard
              title="Pending Loan Applications"
              count={4}
              columns={["Applicant", "Amount", "Action"]}
              data={[
                [
                  <div>
                    <p className="font-medium">Rajesh Mehta</p>
                    <p className="text-xs text-gray-500">24 months</p>
                  </div>,
                  "₹5,00,000",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Kavya Singh</p>
                    <p className="text-xs text-gray-500">18 months</p>
                  </div>,
                  "₹2,50,000",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Arjun Reddy</p>
                    <p className="text-xs text-gray-500">36 months</p>
                  </div>,
                  "₹7,50,000",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
                [
                  <div>
                    <p className="font-medium">Meera Joshi</p>
                    <p className="text-xs text-gray-500">12 months</p>
                  </div>,
                  "₹3,00,000",
                  <button className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
                    Review
                  </button>,
                ],
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
