import React from "react";

const ContactInfoCard = ({ borrower }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Contact Information</h3>
      <div className="space-y-2 text-gray-700">
        <p><strong>Email:</strong> {borrower.email}</p>
        <p><strong>Phone:</strong> {borrower.phone_number || "Not Provided"}</p>
      </div>
    </div>
  );
};

export default ContactInfoCard;
