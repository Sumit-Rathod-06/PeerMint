import { useState } from "react";
import ProgressBar from "../components/Borrower_Dashboard/KYCform/ProgressBar";
import PersonalIdentity from "../components/Borrower_Dashboard/KYCform/PersonalIdentity";
import ResidentialInfo from "../components/Borrower_Dashboard/KYCform/ResidentialInfo";
import DocumentUpload from "../components/Borrower_Dashboard/KYCform/DocumentUpload";

const KYCform = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Identity
    fullName: "",
    dateOfBirth: "",
    gender: "",
    panNumber: "",
    aadhaarNumber: "",
    fatherName: "",
    maritalStatus: "",

    // Residential Info
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    residentialStatus: "",
    sameAsPermanent: false,

    // Documents
    photo: null,
    identityDoc: null,
    addressProof: null,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("KYC verification submitted successfully!");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalIdentity
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <ResidentialInfo
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <DocumentUpload
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-5xl ml-80 px-4">
        <div className="bg-slate-100 rounded-lg mt-18">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            KYC Verification
          </h1>
          <p className="text-gray-600">
            Complete your identity verification to start using our platform
          </p>
        </div>

        <ProgressBar currentStep={currentStep} />

        <div className="mt-8">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default KYCform;
