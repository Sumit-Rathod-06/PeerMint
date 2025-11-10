import { useState, useEffect } from 'react';
import { Calendar, DollarSign, CreditCard, AlertCircle, CheckCircle, Clock, Filter, Download } from 'lucide-react';
import PaymentModal from '../components/Borrower_Dashboard/PaymentModal';
import EMICard from '../components/Borrower_Dashboard/EMICard';

export default function RepaymentPage() {
  const [emis, setEmis] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState('all');
  const [stats, setStats] = useState({
    totalDue: 0,
    overdue: 0,
    upcoming: 0,
    paid: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [emis]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const borrowerId = 1; // replace with dynamic borrowerId (from auth or context)
            const response = await fetch(`http://localhost:5000/api/borrower/repayments`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            console.log("Repayments fetched:", result);
            if (result.success) {
            const repayments = result.data;

            // extract unique loans
            const loansMap = {};
            repayments.forEach(r => {
                if (!loansMap[r.application_id]) {
                loansMap[r.application_id] = {
                    id: r.application_id,
                    loan_amount: r.loan_amount,
                    interest_rate: r.interest_rate,
                    loan_tenure: r.loan_tenure,
                    estimated_emi: r.estimated_emi,
                    borrower_name: r.borrower_name
                };
                }
            });
            console.log("Unique loans extracted:", Object.values(loansMap));
            setLoans(Object.values(loansMap));

            // normalize EMI data
            const emisData = repayments.map(r => ({
                id: r.schedule_id,
                loan_id: r.application_id,
                emi_number: r.installment_number,
                due_date: r.due_date,
                emi_amount: parseFloat(r.total_payment),
                status: r.payment_status.toLowerCase(),
                paid_date: r.paid_on,
                principal_component: r.principal_component,
                interest_component: r.interest_component
            }));
            console.log("Normalized EMI data:", emisData);

            // Overdue detection
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const updatedEmis = emisData.map(e => {
                const due = new Date(e.due_date);
                if (e.status === "pending" && due < today) {
                return { ...e, status: "overdue" };
                }
                return e;
            });

            setEmis(updatedEmis);
            } else {
            console.error("Failed to fetch repayments:", result.message);
            }
        } catch (error) {
            console.error("Error fetching repayments:", error);
        } finally {
            setLoading(false);
        }
    };

  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = new Date();
    upcoming.setDate(upcoming.getDate() + 7);

    const newStats = emis.reduce((acc, emi) => {
      const dueDate = new Date(emi.due_date);
      console.log("Processing EMI:", emi);
      if (emi.status === 'paid') {
        acc.paid += parseFloat(emi.emi_amount || 0);
      } else if (emi.status === 'overdue') {
        acc.overdue += parseFloat(emi.emi_amount - (emi.paid_amount || 0));
        acc.totalDue += parseFloat(emi.emi_amount - (emi.paid_amount || 0));
      } else if (dueDate <= upcoming) {
        acc.upcoming += parseFloat(emi.emi_amount - (emi.paid_amount || 0));
        acc.totalDue += parseFloat(emi.emi_amount - (emi.paid_amount || 0));
      } else {
        acc.totalDue += parseFloat(emi.emi_amount - (emi.paid_amount || 0));
      }

      return acc;
    }, { totalDue: 0, overdue: 0, upcoming: 0, paid: 0 });
    console.log("Calculated stats:", newStats);
    setStats(newStats);
  };

  const handlePaymentClick = (emi) => {
    setSelectedEMI(emi);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedEMI(null);
    fetchData();
  };

  const filteredEmis = emis.filter(emi => {
    if (selectedLoan !== 'all' && emi.loan_id !== selectedLoan) return false;

    if (filter === 'pending') return emi.status === 'pending';
    if (filter === 'overdue') return emi.status === 'overdue';
    if (filter === 'paid') return emi.status === 'paid';
    if (filter === 'upcoming') {
      const dueDate = new Date(emi.due_date);
      const upcoming = new Date();
      upcoming.setDate(upcoming.getDate() + 7);
      return emi.status === 'pending' && dueDate <= upcoming;
    }

    return true;
  });

  const downloadStatement = () => {
    const csvContent = [
      ['EMI Number', 'Due Date', 'Amount', 'Status', 'Paid Date', 'Late Fee'],
      ...emis.map(emi => [
        emi.emi_number,
        new Date(emi.due_date).toLocaleDateString(),
        emi.emi_amount,
        emi.status,
        emi.paid_date ? new Date(emi.paid_date).toLocaleDateString() : '-',
        emi.late_fee || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emi-statement-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your repayment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-5xl ml-80 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EMI Repayments</h1>
          <p className="mt-2 text-gray-600">Manage your loan repayments and payment history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Due</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₹{stats.totalDue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  ₹{stats.overdue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming (7 days)</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  ₹{stats.upcoming.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹{stats.paid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filter EMIs</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedLoan}
                  onChange={(e) => setSelectedLoan(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Loans</option>
                  {loans.map(loan => (
                    <option key={loan.id} value={loan.id}>
                      Loan - ₹{parseFloat(loan.loan_amount).toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming (7 days)</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="paid">Paid</option>
                </select>

                <button
                  onClick={downloadStatement}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredEmis.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No EMIs Found</h3>
            <p className="text-gray-600">No EMIs match your current filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmis.map(emi => (
              <EMICard
                key={emi.id}
                emi={emi}
                onPaymentClick={handlePaymentClick}
              />
            ))}
          </div>
        )}
      </div>

      {showPaymentModal && selectedEMI && (
        <PaymentModal
          emi={selectedEMI}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedEMI(null);
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
