import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Borrower_Dashboard/Sidebar";
import Header from "../components/Borrower_Dashboard/Header";
import LoanTable from "../components/Borrower_Dashboard/LoanTable";
import LoanDetailsModal from "../components/Borrower_Dashboard/LoanDetailsModal";

const MyLoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/borrower/loans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoans(res.data.data || []);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-5xl ml-80 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              Loading your loans...
            </div>
          ) : loans.length > 0 ? (
            <LoanTable loans={loans} onSelectLoan={setSelectedLoan} />
          ) : (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              You don’t have any loans yet.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Details */}
      {selectedLoan && (
        <LoanDetailsModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
      )}
    </div>
  );
};

export default MyLoansPage;
