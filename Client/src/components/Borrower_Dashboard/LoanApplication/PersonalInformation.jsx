"use client"

export default function PersonalInformation({ formData, updateFormData }) {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide your basic personal details. Some information is pre-filled from your profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
          <p className="text-xs text-gray-500 mt-1">Pre-filled from profile</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john.doe@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">Pre-filled from profile</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+91 9876543210"
          />
          <p className="text-xs text-gray-500 mt-1">Pre-filled from profile</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="dd-mm-yyyy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Number</label>
          <input
            type="text"
            value={formData.panNumber}
            onChange={(e) => handleChange("panNumber", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ABCDE1234F"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
          <input
            type="text"
            value={formData.aadhaarNumber}
            onChange={(e) => handleChange("aadhaarNumber", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1234 5678 9012"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">Current Residential Address</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
          <input
            type="text"
            value={formData.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="House/Flat No, Building Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Street, Area, Landmark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="400001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Mumbai"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select state</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
            <option value="tamil-nadu">Tamil Nadu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Residential Status</label>
          <select
            value={formData.residentialStatus}
            onChange={(e) => handleChange("residentialStatus", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select status</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
            <option value="family">Family Owned</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Years at Current Address</label>
          <input
            type="number"
            value={formData.yearsAtAddress}
            onChange={(e) => handleChange("yearsAtAddress", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0"
            min="0"
          />
        </div>
      </div>
    </div>
  )
}
