import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/Admin_Dashboard/Sidebar";
import StatCard from "../components/Admin_Dashboard/StatCard";
import TableCard from "../components/Admin_Dashboard/TableCard";
import Header from "../components/Admin_Dashboard/Header";
import { AlertCircle, Users, DollarSign, Wallet2 } from "lucide-react";
import BASE_URL from "../assets/assests";
import LoanModal from "../components/Admin_Dashboard/LoanModal";
import KYCmodal from "../components/Admin_Dashboard/KYCmodal";

const Dashboard = () => {
  const [kycData, setKycData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});

  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false);

  const [selectedKycBorrower, setSelectedKycBorrower] = useState(null);
  const [showKycModal, setShowKycModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [kycRes, loanRes, summaryRes] = await Promise.all([
        fetch(`${BASE_URL}/api/admin/kyc`),
        fetch(`${BASE_URL}/api/admin/loanApplication`),
        fetch(`${BASE_URL}/api/admin/dashboard`),
      ]);

      const kycJson = await kycRes.json();
      const loanJson = await loanRes.json();
      const summaryJson = await summaryRes.json();

      if (kycJson.success) setKycData(kycJson.data || []);
      if (loanJson.success) setLoanData(loanJson.data || []);
      if (summaryJson.success) setSummary(summaryJson.data || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow">
          <Header />
        </header>

        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-600">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor platform activities and manage pending actions
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Pending Actions"
              value={summary.pendingKyc}
              subtitle="KYC + Loan applications"
              change={`+${summary.pendingKyc} pending`}
              Icon={AlertCircle}
            />
            <StatCard
              title="Total Users"
              value={summary.totalUsers}
              subtitle="Registered users"
              change="+12% from last month"
              Icon={Users}
            />
            <StatCard
              title="Active Loans"
              value={summary.activeLoans}
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

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* KYC Table */}
            <TableCard
              title="Pending KYC Verifications"
              count={kycData.length}
              columns={["User", "Submitted", "Action"]}
              data={kycData.map((item) => [
                <div key={item.kyc_id}>
                  <p className="font-medium">{item.full_name}</p>
                  <p className="text-xs text-gray-500">{item.city}</p>
                </div>,
                new Date(item.created_at).toLocaleDateString(),
                <button
                  className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedKycBorrower(item);
                    setShowKycModal(true);
                  }}
                >
                  Review
                </button>,
              ])}
            />

            {/* Loan Table */}
            <TableCard
              title="Pending Loan Applications"
              count={loanData.length}
              columns={["Applicant", "Amount", "Action"]}
              data={loanData.map((loan) => [
                <div key={loan.application_id}>
                  <p className="font-medium">{loan.full_name}</p>
                  <p className="text-xs text-gray-500">{loan.loan_tenure} months</p>
                </div>,
                `₹${Number(loan.loan_amount).toLocaleString()}`,
                <button
                  className="px-3 py-1 bg-white border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedLoanId(loan.application_id);
                    setShowLoanModal(true);
                  }}
                >
                  Review
                </button>,
              ])}
            />
          </div>
        </main>
      </div>

      {/* Loan Modal */}
      {showLoanModal && (
        <LoanModal
          loanId={selectedLoanId}
          onClose={() => setShowLoanModal(false)}
        />
      )}

      {/* KYC Modal */}
      {showKycModal && selectedKycBorrower && (
        <KYCmodal
          borrower={selectedKycBorrower}
          isOpen={showKycModal}
          onClose={() => setShowKycModal(false)}
          refreshData={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default Dashboard;
