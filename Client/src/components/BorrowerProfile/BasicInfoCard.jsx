import React from "react";

const BasicInfoCard = ({ borrower, kyc }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Basic Information</h3>
      <div className="space-y-2 text-gray-700">
        <p><strong>Full Name:</strong> {kyc.full_name || borrower.first_name + " " + borrower.last_name}</p>
        <p><strong>Date of Birth:</strong> {kyc.dob || "Not Provided"}</p>
        <p><strong>Gender:</strong> {kyc.gender || "Not Provided"}</p>
        <p><strong>Father’s Name:</strong> {kyc.father_name || "Not Provided"}</p>
      </div>
      <button className="mt-4 bg-gray-100 border px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
        Reset Password
      </button>
    </div>
  );
};

export default BasicInfoCard;
