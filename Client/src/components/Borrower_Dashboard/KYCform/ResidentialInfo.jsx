import React from "react";

const ResidentialInfo = ({ data, updateData, onNext, onBack }) => {
  const handleInputChange = (field, value) => {
    updateData({ [field]: value });
  };

  const handleNext = () => {
    // Basic validation
    if (!data.addressLine1 || !data.pincode || !data.city || !data.state) {
      alert("Please fill in all required fields");
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Residential Information
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your current and permanent address details.
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Current Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              placeholder="House/Flat No., Building Name"
              value={data.addressLine1}
              onChange={(e) =>
                handleInputChange("addressLine1", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              placeholder="Street, Area, Landmark"
              value={data.addressLine2}
              onChange={(e) =>
                handleInputChange("addressLine2", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              placeholder="400001"
              value={data.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              maxLength="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              placeholder="Mumbai"
              value={data.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <select
              value={data.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select state</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="gujarat">Gujarat</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="west-bengal">West Bengal</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Residential Status *
            </label>
            <select
              value={data.residentialStatus}
              onChange={(e) =>
                handleInputChange("residentialStatus", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select status</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="family-owned">Family Owned</option>
              <option value="company-provided">Company Provided</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.sameAsPermanent}
              onChange={(e) =>
                handleInputChange("sameAsPermanent", e.target.checked)
              }
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              My Permanent Address is the same as my Current Address
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResidentialInfo;
