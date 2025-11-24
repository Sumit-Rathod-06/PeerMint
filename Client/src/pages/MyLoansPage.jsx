// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Borrower_Dashboard/Sidebar";
// import Header from "../components/Borrower_Dashboard/Header";
// import LoanTable from "../components/Borrower_Dashboard/LoanTable";
// import LoanDetailsModal from "../components/Borrower_Dashboard/LoanDetailsModal";

// const MyLoansPage = () => {
//   const [loans, setLoans] = useState([]);
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/borrower/loans", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLoans(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching loans:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLoans();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-100 flex">
      

//       {/* Main Content */}
//       <div className="flex-1 p-8 max-w-5xl ml-80 px-4">
//         <div className="max-w-6xl mx-auto">
//           {loading ? (
//             <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
//               Loading your loans...
//             </div>
//           ) : loans.length > 0 ? (
//             <LoanTable loans={loans} onSelectLoan={setSelectedLoan} />
//           ) : (
//             <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
//               You don’t have any loans yet.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal for Details */}
//       {selectedLoan && (
//         <LoanDetailsModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
//       )}
//     </div>
//   );
// };

// export default MyLoansPage;


import { useState, useEffect } from 'react';
import LoanCard from '../components/Borrower_Dashboard/LoanCard';
import LoanDetailModal from '../components/Borrower_Dashboard/LoanDetailsModal';

function LoanStatus() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchLoans();
  }, []);

  // ✅ Fetch loans from backend API
  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/borrower/loans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      if (!result.success) throw new Error('Failed to fetch loans');

      setLoans(result.data || []);
    } catch (error) {
      console.error('Error fetching loans:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan.loan_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  // ✅ Categorize loans by status
  const categorizeLoans = () => {
    const pending = loans.filter((loan) => loan.status === 'pending');
    const active = loans.filter((loan) => loan.status === 'active');
    const completed = loans.filter((loan) => loan.status === 'completed' || loan.status === 'closed');

    return { pending, active, completed };
  };

  const { pending, active, completed } = categorizeLoans();

  const getFilteredLoans = () => {
    switch (activeTab) {
      case 'pending':
        return pending;
        
      case 'active':
        return active;
      case 'completed':
        return completed;
      default:
        return loans;
    }
  };

  const filteredLoans = getFilteredLoans();

  const TabButton = ({ id, label, count, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-indigo-600 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {label}{' '}
      <span className={`ml-2 ${isActive ? 'text-indigo-200' : 'text-gray-400'}`}>
        ({count})
      </span>
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl ml-80 px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Loans</h1>
          <p className="mt-2 text-gray-600">Track and manage all your loan applications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-600 mb-1">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900">{loans.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{pending.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Active</p>
            <p className="text-3xl font-bold text-blue-600">{active.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completed.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <TabButton id="all" label="All Loans" count={loans.length} isActive={activeTab === 'all'} />
            <TabButton id="pending" label="Pending" count={pending.length} isActive={activeTab === 'pending'} />
            <TabButton id="active" label="Active" count={active.length} isActive={activeTab === 'active'} />
            <TabButton id="completed" label="Completed" count={completed.length} isActive={activeTab === 'completed'} />
          </div>
        </div>

        {/* Loan Grid */}
        {filteredLoans.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No loans found</h3>
            <p className="mt-2 text-gray-500">
              {activeTab === 'all'
                ? "You haven't applied for any loans yet."
                : `You don't have any ${activeTab} loans.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan) => (
              <LoanCard key={loan.loan_id} loan={loan} onClick={() => handleLoanClick(loan)} />
            ))}
          </div>
        )}
      </div>

      {/* Loan Details Modal */}
      <LoanDetailModal loanId={selectedLoan} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default LoanStatus;
