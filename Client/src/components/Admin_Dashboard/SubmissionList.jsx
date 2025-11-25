import { Calendar, Eye, X, Check } from "lucide-react";
import KYCmodal from "./KYCmodal";
import { useState } from "react";

const sampleBorrower = {
  kyc_id: 1,
  full_name: "Sumit Rathod",
  dob: "2005-04-05T18:30:00.000Z",
  gender: "male",
  father_name: "Raghunath Rathod",
  marital_status: "single",
  address:
    "B,108,Riddhi Siddhi Vinayak, Vishal Complex, Chakki Naka, Kalyan, Mumbai",
  city: "Thane",
  state: "maharashtra",
  pincode: "421306",
  residential_status: "owned",
  aadhaar_no: "123456789012",
  aadhaar_url:
    "https://res.cloudinary.com/dctuvwgxj/raw/upload/v1761386455/peermint_docs/mvxuamlb3mjsfck146vo",
  pan_no: "ABCDE1234F",
  pan_url:
    "https://res.cloudinary.com/dctuvwgxj/raw/upload/v1761386455/peermint_docs/tmhl1qnvznkwtqvek8up",
  photo_url:
    "https://res.cloudinary.com/dctuvwgxj/raw/upload/v1761386455/peermint_docs/ffliop4nua6v0hp3utfs",
  kyc_status: "pending",
  created_at: "2025-10-25T10:00:49.595Z",
};

export default function SubmissionList({ submissions ,refreshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = (kycId) => {
    console.log(`Approved KYC ID: ${kycId}`);
    alert(`KYC Application #${kycId} has been approved!`);
    setIsModalOpen(false);
  };

  const handleReject = (kycId) => {
    console.log(`Rejected KYC ID: ${kycId}`);
    alert(`KYC Application #${kycId} has been rejected!`);
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 text-xs rounded-full";
    switch (status) {
      case "Pending":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-800`}>
            Pending
          </span>
        );
      case "Approved":
        return (
          <span className={`${base} bg-green-100 text-green-800`}>
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>
        );
    }
  };

  return (
    <div className="bg-teal-50 p-4 rounded-lg">
      <h2 className="font-medium text-gray-800 mb-3">
        KYC Submissions ({submissions.length})
      </h2>

      <div className="divide-y divide-slate-300">
        {/* Header Row */}
        <div className="grid grid-cols-4 py-2 px-1 text-xs font-medium text-gray-500 uppercase">
          <div>User Details</div>
          <div>Submitted</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {submissions.map((user) => (
          <div
            key={user.kyc_id}
            className="grid grid-cols-4 items-center py-3 px-1 text-sm"
          >
            {/* User Details */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                {user.full_name}
              </span>
              <span className="text-xs text-gray-600">{user.kyc_id}</span>
              {/* <span className="text-xs text-gray-500">{user.email}</span> */}
            </div>

            {/* Submitted Date */}
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <Calendar size={14} />
              {user.created_at}
            </div>

            {/* Status */}
            <div>{getStatusBadge(user.kyc_status)}</div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              {/* Always show Review */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1 cursor-pointer border rounded-md text-gray-600 hover:bg-gray-100"
              >
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
            <KYCmodal
              borrower={user}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              refreshData={refreshData }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
