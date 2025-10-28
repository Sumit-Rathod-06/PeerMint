import React from "react";

const ResidentialInfoCard = ({ kyc }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Residential Information</h3>
      <div className="space-y-2 text-gray-700">
        <p><strong>Address Line 1:</strong> {kyc.address || "Not Provided"}</p>
        {/* <p><strong>Address Line 2:</strong> {kyc.address_line2 || "—"}</p> */}
        <p><strong>City:</strong> {kyc.city || "—"}</p>
        <p><strong>State:</strong> {kyc.state || "—"}</p>
        <p><strong>Pincode:</strong> {kyc.pincode || "—"}</p>
      </div>
    </div>
  );
};

export default ResidentialInfoCard;
