import { useEffect, useState } from "react";

function LoanDetailModal({ loanId, isOpen, onClose }) {
  const [loanDetails, setLoanDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && loanId) {
      fetchLoanDetails();
    }
  }, [isOpen, loanId]);

  const fetchLoanDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/borrower/loan/${loanId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!result.success) throw new Error("Failed to fetch loan details");
      setLoanDetails(result.data);
    } catch (err) {
      console.error("Error fetching loan details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (loading || !loanDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan details...</p>
        </div>
      </div>
    );
  }

  const {
    loan_id,
    amount,
    interest_rate,
    tenure,
    estimated_emi,
    purpose,
    repayment_ammount,
    start_date,
    end_date,
    status,
    lender_name,
  } = loanDetails;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return `₹${Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusInfo = () => {
    switch (status) {
      case "pending":
        return {
          title: "Pending Verification",
          description: "Your loan application is under review.",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        };
      case "active":
        return {
          title: "Active Loan",
          description: "Your loan is currently active and being repaid.",
          bgColor: "bg-blue-50",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
        };
      case "completed":
      case "closed":
        return {
          title: "Completed Loan",
          description: "Your loan has been fully repaid.",
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      default:
        return {
          title: "Unknown",
          description: "Loan status not available.",
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-4`}>
            <p className={`${statusInfo.textColor} font-semibold text-lg`}>
              {statusInfo.title}
            </p>
            <p className="text-gray-600 mt-2">{statusInfo.description}</p>
          </div>

          {/* Loan Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Loan Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Loan ID</p>
                  <p className="text-sm font-medium text-gray-800">#{loan_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Purpose</p>
                  <p className="text-sm font-medium text-gray-800 capitalize">{purpose}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lender</p>
                  <p className="text-sm font-medium text-gray-800">{lender_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Loan Amount</p>
                  <p className="text-lg font-bold text-indigo-600">{formatCurrency(amount)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Terms & Conditions</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Interest Rate</p>
                  <p className="text-sm font-medium text-gray-800">{interest_rate}% per annum</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tenure</p>
                  <p className="text-sm font-medium text-gray-800">{tenure} months</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Monthly EMI</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(estimated_emi)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repayment */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="text-sm font-semibold text-indigo-900 uppercase mb-3">Repayment Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-indigo-600">Total Repayment Amount</p>
                <p className="text-xl font-bold text-indigo-900">{formatCurrency(repayment_ammount)}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-600">Total Interest</p>
                <p className="text-xl font-bold text-indigo-900">
                  {formatCurrency(Number(repayment_ammount) - Number(amount))}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Timeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-800">Start Date</p>
                <p className="text-sm text-gray-600">{formatDate(start_date)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-800">End Date</p>
                <p className="text-sm text-gray-600">{formatDate(end_date)}</p>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetailModal;
