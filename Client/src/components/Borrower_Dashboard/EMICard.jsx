import { Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function EMICard({ emi, onPaymentClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'overdue') {
      return <AlertCircle className="w-4 h-4" />;
    }
    return null;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const dueDate = new Date(emi.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  const remainingAmount = parseFloat(emi.emi_amount) - parseFloat(emi.paid_amount || 0);
  const isPaid = emi.status === 'paid';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">EMI Number</p>
              <p className="text-lg font-semibold text-gray-900">#{emi.emi_number}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Due Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p className="text-lg font-semibold text-gray-900">{formatDate(emi.due_date)}</p>
              </div>
              {!isPaid && daysUntilDue >= 0 && daysUntilDue <= 7 && (
                <p className="text-xs text-orange-600 mt-1">Due in {daysUntilDue} days</p>
              )}
              {!isPaid && daysUntilDue < 0 && (
                <p className="text-xs text-red-600 mt-1">Overdue by {Math.abs(daysUntilDue)} days</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">EMI Amount</p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <p className="text-lg font-semibold text-gray-900">
                  ₹{parseFloat(emi.emi_amount).toLocaleString('en-IN')}
                </p>
              </div>
              {emi.late_fee > 0 && (
                <p className="text-xs text-red-600 mt-1">+ ₹{parseFloat(emi.late_fee).toLocaleString('en-IN')} late fee</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(emi.status)}`}>
                {getStatusIcon(emi.status)}
                {emi.status.charAt(0).toUpperCase() + emi.status.slice(1)}
              </span>
            </div>
          </div>

          {!isPaid && (
            <div className="lg:w-48">
              <button
                onClick={() => onPaymentClick(emi)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Make Payment
              </button>
              {remainingAmount > 0 && (
                <p className="text-xs text-gray-600 mt-2 text-center">
                  ₹{remainingAmount.toLocaleString('en-IN')} remaining
                </p>
              )}
            </div>
          )}

          {isPaid && (
            <div className="lg:w-48 text-center lg:text-right">
              <p className="text-sm text-gray-600">Paid on</p>
              <p className="text-lg font-semibold text-green-600">{formatDate(emi.paid_date)}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Principal</p>
              <p className="text-sm font-medium text-gray-900">
                ₹{parseFloat(emi.principal_component).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Interest</p>
              <p className="text-sm font-medium text-gray-900">
                ₹{parseFloat(emi.interest_component).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}