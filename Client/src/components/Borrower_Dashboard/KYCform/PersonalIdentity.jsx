import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonalIdentity = ({ data, updateData, onNext, onBack }) => {
  const [aadhaarExists, setAadhaarExists] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleInputChange = (field, value) => {
    updateData({ [field]: value });
  };

  // Aadhaar validation call
  useEffect(() => {
    const checkAadhaar = async () => {
      const aadhaar = data.aadhaarNumber?.trim();
      if (!aadhaar || aadhaar.length < 12) {
        setAadhaarExists(false);
        return;
      }

      setChecking(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/check-aadhaar/${aadhaar}`
        );
        setAadhaarExists(res.data.exists);
      } catch (error) {
        console.error("Error checking Aadhaar:", error);
      } finally {
        setChecking(false);
      }
    };

    // Delay API call until user stops typing for 600ms
    const delay = setTimeout(checkAadhaar, 600);
    return () => clearTimeout(delay);
  }, [data.aadhaarNumber]);

  const handleNext = () => {
    if (
      !data.fullName ||
      !data.dateOfBirth ||
      !data.panNumber ||
      !data.aadhaarNumber ||
      !data.fatherName ||
      !data.gender ||
      !data.maritalStatus
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (aadhaarExists) {
      alert("This Aadhaar number is already registered.");
      return;
    }

    onNext();
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Identity Verification
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your personal details exactly as they appear on your
        official documents.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="As it appears on your PAN card"
            value={data.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={data.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* PAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Card Number *
          </label>
          <input
            type="text"
            placeholder="ABCDE1234F"
            value={data.panNumber}
            onChange={(e) =>
              handleInputChange("panNumber", e.target.value.toUpperCase())
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            maxLength="10"
          />
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhaar Number *
          </label>
          <input
            type="text"
            placeholder="123456789012"
            value={data.aadhaarNumber}
            onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              aadhaarExists
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
            maxLength="12"
          />
          {checking && (
            <p className="text-sm text-gray-500 mt-1">Checking Aadhaar...</p>
          )}
          {aadhaarExists && (
            <p className="text-sm text-red-500 mt-1">
              This Aadhaar number is already registered.
            </p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father's Name *
          </label>
          <input
            type="text"
            placeholder="Father's full name"
            value={data.fatherName}
            onChange={(e) => handleInputChange("fatherName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Marital Status */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status *
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) =>
              handleInputChange("maritalStatus", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select marital status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={aadhaarExists}
          className={`px-6 py-2 rounded-md text-white ${
            aadhaarExists
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalIdentity;
