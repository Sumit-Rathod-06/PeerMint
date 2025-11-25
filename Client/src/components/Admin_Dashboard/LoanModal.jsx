
import React, { useEffect, useState } from "react";
import BASE_URL from "../../assets/assests";

const LoanModal = ({ loanId, onClose }) => {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch loan details
  useEffect(() => {
    if (!loanId) return;

    const fetchLoan = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/loanApplication/${loanId}`);
        const json = await res.json();

        if (json.success) {
          setLoan(json.data);
        }
      } catch (error) {
        console.error("Error fetching loan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId]);

  if (!loanId) return null;

  // Approve Loan
  const handleApprove = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/loanApplication/${loanId}/approve`,
        { method: "POST" }
      );
      const json = await res.json();
      if (json.success) {
        alert("Loan Approved Successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  // Reject Loan
  const handleReject = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/loanApplication/${loanId}/reject`,
        { method: "POST" }
      );
      const json = await res.json();
      if (json.success) {
        alert("Loan Rejected.");
        onClose();
      }
    } catch (error) {
      console.error("Error rejecting loan:", error);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Loan Application Review</h2>
              <p className="text-blue-100 mt-1">Application ID: #{loanId}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-all text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            loan && (
              <div className="space-y-6">

                {/* Status Badge */}
                <div className="flex justify-end">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>

                {/* LOAN SUMMARY CARD */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">₹</span>
                    Loan Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <SummaryCard label="Loan Amount" value={`₹${Number(loan.loan_amount).toLocaleString()}`} />
                    <SummaryCard label="Monthly EMI" value={`₹${Number(loan.estimated_emi).toLocaleString()}`} />
                    <SummaryCard label="Total Repayment" value={`₹${Number(loan.total_amount).toLocaleString()}`} />
                  </div>
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    <Info label="Tenure" value={`${loan.loan_tenure} months`} />
                    <Info label="Interest Rate" value={`${loan.interest_rate}%`} />
                    <Info label="Purpose" value={loan.purpose_of_loan} />
                  </div>
                </div>

                {/* PERSONAL INFO */}
                <Section title="Personal Information" icon="👤">
                  <div className="grid grid-cols-3 gap-6">
                    <Info label="Full Name" value={loan.full_name} />
                    <Info label="Date of Birth" value={new Date(loan.dob).toLocaleDateString()} />
                    <Info label="Gender" value={loan.gender} />
                    <Info label="Email Address" value={loan.email} />
                    <Info label="Mobile Number" value={loan.mobile_no} />
                    <Info label="PAN Number" value={loan.pan_no} />
                  </div>
                  <div className="mt-4">
                    <Info label="Aadhaar Number" value={loan.aadhaar_no} />
                  </div>
                </Section>

                {/* ADDRESS */}
                <Section title="Address Details" icon="🏠">
                  <div className="grid grid-cols-2 gap-6">
                    <Info label="Address Line 1" value={loan.address_line1} />
                    <Info label="Address Line 2" value={loan.address_line2 || "N/A"} />
                    <Info label="City" value={loan.city} />
                    <Info label="State" value={loan.state} />
                    <Info label="Pincode" value={loan.pincode} />
                    <Info label="Residential Status" value={loan.residential_status} />
                  </div>
                  <div className="mt-4">
                    <Info label="Years at Current Address" value={loan.years_at_current_address} />
                  </div>
                </Section>

                {/* EMPLOYMENT */}
                <Section title="Employment & Income" icon="💼">
                  <div className="grid grid-cols-3 gap-6">
                    <Info label="Employment Type" value={loan.employment_type} />
                    <Info label="Annual Income" value={loan.annual_income ? `₹${Number(loan.annual_income).toLocaleString()}` : "Not Provided"} />
                    <Info label="Business Name" value={loan.business_name || "N/A"} />
                  </div>
                </Section>

                {/* BANK DETAILS */}
                <Section title="Bank Account Details" icon="🏦">
                  <div className="grid grid-cols-3 gap-6">
                    <Info label="Bank Name" value={loan.bank_name} />
                    <Info label="Account Number" value={loan.bank_account_no} />
                    <Info label="IFSC Code" value={loan.ifsc_code} />
                  </div>
                </Section>

                {/* DOCUMENTS */}
                <Section title="Supporting Documents" icon="📄">
                  <div className="grid grid-cols-2 gap-4">
                    <DocumentCard 
                      label="ITR Document" 
                      url={loan.itr_url}
                    />
                    <DocumentCard 
                      label="Bank Statement" 
                      url={loan.bank_statement_url}
                    />
                  </div>
                </Section>

              </div>
            )
          )}
        </div>

        {/* Action Footer */}
        {!loading && loan && (
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">Review all details carefully before making a decision</p>
            <div className="flex gap-4">
              <button
                onClick={handleReject}
                className="px-8 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold transition-all shadow-sm"
              >
                Reject Application
              </button>

              <button
                onClick={handleApprove}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Approve Application
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoanModal;

// Section Component
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <span className="mr-2 text-xl">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

// Info Component
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
    <p className="text-base font-semibold text-gray-900">{value || "N/A"}</p>
  </div>
);

// Summary Card Component
const SummaryCard = ({ label, value }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
    <p className="text-2xl font-bold text-blue-700">{value}</p>
  </div>
);

// Document Card Component
const DocumentCard = ({ label, url }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
    <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
    {url ? (
      <a 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Document
      </a>
    ) : (
      <p className="text-sm text-gray-400 italic">Not uploaded</p>
    )}
  </div>
);