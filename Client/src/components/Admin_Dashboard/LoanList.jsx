import { Calendar, Eye, X, Check } from "lucide-react";

export default function LoanList({ submissions }) {
  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 text-xs rounded-full";
    switch (status) {
      case "Pending":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case "Approved":
        return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
      case "Rejected":
        return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
    }
  };

  return (
    <div className="bg-teal-50 p-4 rounded-lg">
      <h2 className="font-medium text-gray-800 mb-3">
        KYC Submissions ({submissions.length})
      </h2>

      <div className="divide-y divide-slate-300">
        {/* Header Row */}
        <div className="grid grid-cols-5 py-2 px-1 text-xs font-medium text-gray-500 uppercase">
          <div>Applicant</div>
          <div>Loan Details</div>
          <div>Applied</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {submissions.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-5 items-center py-3 px-1 text-sm"
          >
            {/* User Details */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{user.applicant}</span>
              <span className="text-xs text-gray-600">{user.loanId}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>

            {/* Loan Details */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{user.amount}</span>
              <span className="text-xs text-gray-600">{user.tenure}</span>
              <span className="text-xs text-gray-500">{user.purpose}</span>
            </div>

            {/* Submitted Date */}
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <Calendar size={14} />
              {user.applied}
            </div>

            {/* Status */}
            <div>{getStatusBadge(user.status)}</div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              {/* Always show Review */}
              <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">
                <Eye size={14} /> Review
              </button>

              {/* Only show Approve/Reject when Pending */}
              {user.status === "Pending" && (
                <>
                  <button className="p-2 rounded-md bg-red-700 text-white hover:bg-red-800">
                    <X size={14} />
                  </button>
                  <button className="p-2 rounded-md bg-emerald-900 text-white hover:bg-emerald-950">
                    <Check size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
