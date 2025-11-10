// import React from "react";
// import { X } from "lucide-react";

// const LoanDetailsModal = ({ loan, onClose }) => {
//   const {
//     loan_id,
//     amount,
//     interest_rate,
//     tenure,
//     emi,
//     start_date,
//     end_date,
//     repayment_status,
//     lender_name,
//   } = loan;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
//           Loan #{loan_id}
//         </h2>

//         <div className="space-y-2 text-gray-700">
//           <p><strong>Amount:</strong> ₹{amount}</p>
//           <p><strong>Interest Rate:</strong> {interest_rate}%</p>
//           <p><strong>Tenure:</strong> {tenure} months</p>
//           <p><strong>EMI:</strong> ₹{emi}</p>
//           <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
//           <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
//           <p><strong>Status:</strong> {repayment_status}</p>
//           {lender_name && <p><strong>Lender:</strong> {lender_name}</p>}
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanDetailsModal;


function LoanDetailModal({ loan, isOpen, onClose }) {
  console.log("Loan Detail Modal Loan Data:", loan);
  if (!isOpen || !loan) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const getStatusInfo = () => {
    if (loan.is_funded) {
      return {
        title: 'Funded',
        description: 'Your loan has been successfully funded and disbursed.',
        color: 'green',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        borderColor: 'border-green-200'
      };
    }
    if (loan.is_verified) {
      return {
        title: 'Verified - Awaiting Funding',
        description: 'Your loan has been verified by admin and is awaiting investor funding.',
        color: 'blue',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200'
      };
    }
    return {
      title: 'Pending Verification',
      description: 'Your loan application is under review by our admin team.',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-4`}>
            <div className="flex items-center space-x-3">
              <div className={`${statusInfo.textColor} font-semibold text-lg`}>
                {statusInfo.title}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{statusInfo.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Loan Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Loan ID</p>
                  <p className="text-sm font-medium text-gray-800">{loan.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Purpose</p>
                  <p className="text-sm font-medium text-gray-800">{loan.purpose}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Loan Amount</p>
                  <p className="text-lg font-bold text-indigo-600">{formatCurrency(loan.loan_amount)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Terms & Conditions</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Interest Rate</p>
                  <p className="text-sm font-medium text-gray-800">{loan.interest_rate}% per annum</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Loan Term</p>
                  <p className="text-sm font-medium text-gray-800">{loan.loan_term} months</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Monthly EMI</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(loan.monthly_emi)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="text-sm font-semibold text-indigo-900 uppercase mb-3">Repayment Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-indigo-600">Total Repayment Amount</p>
                <p className="text-xl font-bold text-indigo-900">{formatCurrency(loan.total_repayment)}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-600">Total Interest</p>
                <p className="text-xl font-bold text-indigo-900">
                  {formatCurrency(loan.total_repayment - loan.loan_amount)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Application Submitted</p>
                  <p className="text-xs text-gray-500">{formatDate(loan.application_date)}</p>
                </div>
              </div>

              {loan.verification_date && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Verified by Admin</p>
                    <p className="text-xs text-gray-500">{formatDate(loan.verification_date)}</p>
                  </div>
                </div>
              )}

              {!loan.is_verified && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Awaiting Verification</p>
                    <p className="text-xs text-gray-400">Pending</p>
                  </div>
                </div>
              )}

              {loan.funding_date && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Loan Funded</p>
                    <p className="text-xs text-gray-500">{formatDate(loan.funding_date)}</p>
                  </div>
                </div>
              )}

              {loan.is_verified && !loan.is_funded && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Awaiting Funding</p>
                    <p className="text-xs text-gray-400">Investors are reviewing your loan</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
