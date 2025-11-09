"use client"

import { useState, useEffect } from "react"

export default function LoanDetails({ formData, updateFormData }) {
  const [estimatedEMI, setEstimatedEMI] = useState(9026)

  const handleLoanAmountChange = (value) => {
    updateFormData({ loanAmount: value })
    calculateEMI(value, formData.tenure)
  }

  const handleTenureChange = (tenure) => {
    updateFormData({ tenure })
    calculateEMI(formData.loanAmount, tenure)
  }

  const calculateEMI = (principal, tenure) => {
    const rate = 0.15 / 12 // 15% annual rate
    const n = tenure
    const emi = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
    const roundedEMI = Math.round(emi)
    setEstimatedEMI(roundedEMI)

    // 🟢 Store calculated EMI details in formData as well
    const totalAmount = Math.round(roundedEMI * tenure)
    updateFormData({
      estimatedEMI: roundedEMI,
      totalAmount,
      interestRate: 15,
    })
  }

  useEffect(() => {
    calculateEMI(formData.loanAmount, formData.tenure)
  }, [formData.loanAmount, formData.tenure])

  const tenureOptions = [12, 18, 24, 36, 48, 60]

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Loan Requirements</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your loan requirements. We'll show you an estimated EMI in real-time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Loan Amount Required (₹)
            </label>
            <div className="relative">
              <input
                type="range"
                min="25000"
                max="500000"
                step="5000"
                value={formData.loanAmount}
                onChange={(e) => handleLoanAmountChange(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹25,000</span>
                <span>₹5,00,000</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-semibold text-gray-800">
                  ₹{formData.loanAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Loan</label>
            <select
              value={formData.loanPurpose}
              onChange={(e) => updateFormData({ loanPurpose: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select loan purpose</option>
              <option value="personal">Personal Use</option>
              <option value="medical">Medical Emergency</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="wedding">Wedding</option>
              <option value="home-improvement">Home Improvement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Preferred Loan Tenure (Months)
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {tenureOptions.map((tenure) => (
                <button
                  key={tenure}
                  onClick={() => handleTenureChange(tenure)}
                  className={`p-3 rounded-md border text-center font-medium ${
                    formData.tenure === tenure
                      ? "bg-indigo-700 text-white border-indigo-700"
                      : "bg-white text-gray-700 border-gray-300 hover:border-indigo-500"
                  }`}
                >
                  {tenure}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>6 months</span>
              <span>60 months</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-gray-700">
                {formData.tenure} months selected
              </span>
            </div>
          </div>
        </div>

        {/* EMI Summary Block */}
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated EMI</h3>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-indigo-700 mb-1">
                ₹{estimatedEMI.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">per month</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">₹{formData.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span className="font-medium">{formData.tenure} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-medium">{formData.interestRate || 15}% p.a.</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-800">Total Amount:</span>
                <span>₹{(estimatedEMI * formData.tenure).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-md">
              <p className="text-xs text-yellow-800">
                * This is an estimated EMI based on a simplified calculation. Actual rates may vary based on your
                profile and market conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
