"use client"

import { useState } from "react"
import ProgressBar from "./ProgressBar"
import PersonalInformation from "./PersonalInformation"
import Employment from "./Employment"
import LoanDetails from "./LoanDetails"
import Documents from "./Documents"
import Review from "./Review"
import axios from "axios"

const steps = [
  { id: 1, title: "Personal", subtitle: "Personal Information" },
  { id: 2, title: "Employment", subtitle: "Employment & Income" },
  { id: 3, title: "Loan Details", subtitle: "Loan Requirements" },
  { id: 4, title: "Documents", subtitle: "Upload Documents" },
  { id: 5, title: "Review", subtitle: "Review & Submit" },
]

export default function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 9876543210",
    dateOfBirth: "",
    gender: "",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "1234 5678 9012",
    addressLine1: "House/Flat No, Building Name",
    addressLine2: "Street, Area, Landmark",
    pincode: "400001",
    city: "Mumbai",
    state: "",
    residentialStatus: "",
    yearsAtAddress: "0",

    // Employment
    employmentType: "",
    businessName: "",
    annualIncome: "",
    bankName: "",
    accountNumber: "123456789012345",
    ifscCode: "SBIN0001234",

    // Loan Details
    loanAmount: 100000,
    loanPurpose: "",
    tenure: 12,

    // Documents
    documents: {},
  })

  const handleSubmit = () => {
    console.log("Loan Application submitted:", formData)
    const token = localStorage.getItem("token") // or however you store your JWT

    axios.post("http://localhost:5000/api/borrower/loanapplication", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Loan Application submitted successfully:", response.data)
      alert("Loan Application submitted successfully!")
    })
    .catch((error) => {
      console.error("Error submitting Loan Application:", error)
      alert("There was an error submitting your application. Please try again.")
    })
  }

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation formData={formData} updateFormData={updateFormData} />
      case 2:
        return <Employment formData={formData} updateFormData={updateFormData} />
      case 3:
        return <LoanDetails formData={formData} updateFormData={updateFormData} />
      case 4:
        return <Documents formData={formData} updateFormData={updateFormData} />
      case 5:
        return <Review formData={formData} updateFormData={updateFormData} setCurrentStep={setCurrentStep} />
      default:
        return null
    }
  }

  return (
    <div className="bg-slate-100 rounded-lg mt-18">
    
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Loan Application</h1>
        <p className="text-gray-600">Complete your loan application in 5 simple steps</p>
      </div>

      <ProgressBar steps={steps} currentStep={currentStep} />

      <div className="py-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="cursor-pointer px-6 py-2 text-gray-600 bg-white rounded-md hover:bg-gray-50 showdow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {currentStep < 5 ? (
            <button onClick={nextStep} className="cursor-pointer px-6 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-800">
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="cursor-pointer px-6 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-800"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
