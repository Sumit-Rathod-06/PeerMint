"use client";
import Comp from "../Comp";

import { useState } from "react";
import { X, FileText, CheckCircle, XCircle } from "lucide-react";

export default function KYCmodal({
  borrower,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      onApprove(borrower.kyc_id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      onReject(borrower.kyc_id);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="z-50 sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex items-center justify-between border-b">
          <div>
            <h2 className="text-2xl font-bold">KYC Review</h2>
            <p className="text-slate-300 text-sm mt-1">
              Application ID: {borrower.kyc_id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Full Name
                </label>
                <p className="text-slate-900 font-semibold mt-1">
                  {borrower.full_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Date of Birth
                </label>
                <p className="text-slate-900 font-semibold mt-1">
                  {formatDate(borrower.dob)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Gender
                </label>
                <p className="text-slate-900 font-semibold mt-1 capitalize">
                  {borrower.gender}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Marital Status
                </label>
                <p className="text-slate-900 font-semibold mt-1 capitalize">
                  {borrower.marital_status}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Father's Name
                </label>
                <p className="text-slate-900 font-semibold mt-1">
                  {borrower.father_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Residential Status
                </label>
                <p className="text-slate-900 font-semibold mt-1 capitalize">
                  {borrower.residential_status}
                </p>
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded"></div>
              Address Information
            </h3>
            <div className="space-y-4 bg-slate-50 p-6 rounded-lg">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Address
                </label>
                <p className="text-slate-900 font-semibold mt-1">
                  {borrower.address}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    City
                  </label>
                  <p className="text-slate-900 font-semibold mt-1 capitalize">
                    {borrower.city}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    State
                  </label>
                  <p className="text-slate-900 font-semibold mt-1 capitalize">
                    {borrower.state}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Pincode
                  </label>
                  <p className="text-slate-900 font-semibold mt-1">
                    {borrower.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-600 rounded"></div>
              Document Verification
            </h3>
            <div className="space-y-4">
              {/* Aadhaar */}
              <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-600" size={24} />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Aadhaar Card
                      </h4>
                      <p className="text-sm text-slate-600">
                        Number: {borrower.aadhaar_no}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                {borrower.aadhaar_url && (
                  //   <a
                  //     href={borrower.aadhaar_url}
                  //     target="_blank"
                  //     rel="noopener noreferrer"
                  //     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  //   >
                  //     View Document →
                  //   </a>
                  <Comp url={borrower.aadhaar_url} />
                )}
              </div>

              {/* PAN */}
              <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="text-green-600" size={24} />
                    <div>
                      <h4 className="font-semibold text-slate-900">PAN Card</h4>
                      <p className="text-sm text-slate-600">
                        Number: {borrower.pan_no}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                {borrower.pan_url && (
                  //   <a
                  //     href={borrower.pan_url}
                  //     target="_blank"
                  //     rel="noopener noreferrer"
                  //     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  //   >
                  //     View Document →
                  //   </a>
                  <Comp url={borrower.pan_url} />
                )}
              </div>

              {/* Photo */}
              <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="text-purple-600" size={24} />
                    <div>
                      <h4 className="font-semibold text-slate-900">Photo ID</h4>
                      <p className="text-sm text-slate-600">
                        Verification photo
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                {borrower.photo_url && (
                  //   <a
                  //     href={borrower.photo_url}
                  //     target="_blank"
                  //     rel="noopener noreferrer"
                  //     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  //   >
                  //     View Photo →
                  //   </a>
                  <Comp url={borrower.aadhaar_url} />
                )}
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Submitted on:</span>{" "}
              {formatDate(borrower.created_at)}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              <span className="font-medium">Status:</span>{" "}
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold mt-1 capitalize">
                {borrower.kyc_status}
              </span>
            </p>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 flex gap-4 justify-end">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-6 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            disabled={isProcessing}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <XCircle size={18} />
            Reject
          </button>
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle size={18} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
