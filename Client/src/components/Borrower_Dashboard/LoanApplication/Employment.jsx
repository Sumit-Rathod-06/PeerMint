"use client"

export default function Employment({ formData, updateFormData }) {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Financial Profile</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your employment and income details to assess your loan eligibility.
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
        <select
          value={formData.employmentType}
          onChange={(e) => handleChange("employmentType", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select employment type</option>
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self Employed</option>
          <option value="business">Business Owner</option>
          <option value="freelancer">Freelancer</option>
        </select>
      </div>

      <h3 className="text-lg font-medium text-gray-800 mb-4">Bank Account Details</h3>
      <p className="text-gray-600 mb-6">This account will be used for loan disbursement.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
          <select
            value={formData.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select your bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
            <option value="kotak">Kotak Mahindra Bank</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="123456789012345"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
          <input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => handleChange("ifscCode", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="SBIN0001234"
          />
        </div>
      </div>
    </div>
  )
}
