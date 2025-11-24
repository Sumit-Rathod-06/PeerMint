function LoanCard({ loan, onClick }) {
  const getStatusBadge = () => {
    if (loan.status === 'active') {
      return (
        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
          Funded
        </span>
      );
    }
    if (loan.status === 'verified') {
      return (
        <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
          Verified
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
        Pending Verification
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Loan #{loan.loan_id}</h3>
          <p className="text-sm text-gray-500 mt-1">{loan.purpose}</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Loan Amount</span>
          <span className="text-lg font-bold text-indigo-600">{formatCurrency(loan.amount)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Interest Rate</span>
          <span className="text-sm font-medium text-gray-800">{loan.interest_rate}% per annum</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Loan Term</span>
          <span className="text-sm font-medium text-gray-800">{loan.tenure} months</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Monthly EMI</span>
          <span className="text-sm font-medium text-gray-800">{formatCurrency(loan.estimated_emi)}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">Applied Date</span>
          <span className="text-sm font-medium text-gray-800">{formatDate(loan.start_date)}</span>
        </div>
      </div>
    </div>
  );
}

export default LoanCard;
