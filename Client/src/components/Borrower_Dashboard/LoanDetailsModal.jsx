import React from "react";
import { X } from "lucide-react";

const LoanDetailsModal = ({ loan, onClose }) => {
  const {
    loan_id,
    amount,
    interest_rate,
    tenure,
    emi,
    start_date,
    end_date,
    repayment_status,
    lender_name,
  } = loan;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Loan #{loan_id}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Interest Rate:</strong> {interest_rate}%</p>
          <p><strong>Tenure:</strong> {tenure} months</p>
          <p><strong>EMI:</strong> ₹{emi}</p>
          <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {repayment_status}</p>
          {lender_name && <p><strong>Lender:</strong> {lender_name}</p>}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;
