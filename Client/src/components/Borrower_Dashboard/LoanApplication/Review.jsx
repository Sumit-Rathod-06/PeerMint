"use client";

export default function Review({ formData, setCurrentStep }) {
  const EditButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Edit
    </button>
  );

  return (
    <div className="bg-teal-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Review Your Application
      </h2>
      <p className="text-gray-600 mb-6">
        Please review all the information below before submitting your loan
        application. You can edit any section by clicking the edit button.
      </p>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Personal Information
            </h3>
            <EditButton onClick={() => setCurrentStep(1)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Full Name</span>
              <div className="font-medium">
                {formData.fullName || "John Doe"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Email</span>
              <div className="font-medium">
                {formData.email || "john.doe@example.com"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Mobile</span>
              <div className="font-medium">
                {formData.mobile || "+91 9876543210"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Date of Birth</span>
              <div className="font-medium">
                {formData.dateOfBirth || "Not provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">PAN Number</span>
              <div className="font-medium">
                {formData.panNumber || "Not provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Address</span>
              <div className="font-medium">
                {formData.addressLine1 || "Not provided"}
              </div>
            </div>
          </div>
        </div>

        {/* Employment & Income */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Employment & Income
            </h3>
            <EditButton onClick={() => setCurrentStep(2)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Employment Type</span>
              <div className="font-medium">
                {formData.employmentType || "Not Provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Business Name</span>
              <div className="font-medium">
                {formData.businessName || "Not provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Annual Income</span>
              <div className="font-medium">
                {formData.annualIncome || "Not provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Bank</span>
              <div className="font-medium">
                {formData.bankName || "Not provided"}
              </div>
            </div>
          </div>
        </div>

        {/* Loan Requirements */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Loan Requirements
            </h3>
            <EditButton onClick={() => setCurrentStep(3)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Loan Amount</span>
              <div className="font-medium">
                ₹{formData.loanAmount?.toLocaleString() || "1,00,000"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Purpose</span>
              <div className="font-medium">
                {formData.loanPurpose || "Not Provided"}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Tenure</span>
              <div className="font-medium">{formData.tenure || 12} months</div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Documents</h3>
            <EditButton onClick={() => setCurrentStep(4)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Identity Proof (PAN Card)</span>
              <div className="font-medium">
                {formData.panCardFile ? (
                  <span className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Uploaded
                  </span>
                ) : (
                  <span className="text-orange-600">Not uploaded</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-600">
                Address Proof (Aadhaar Front)
              </span>
              <div className="font-medium">
                {formData.aadhaarFrontFile ? (
                  <span className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Uploaded
                  </span>
                ) : (
                  <span className="text-orange-600">Not uploaded</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-600">
                Address Proof (Aadhaar Back)
              </span>
              <div className="font-medium">
                {formData.aadhaarBackFile ? (
                  <span className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Uploaded
                  </span>
                ) : (
                  <span className="text-orange-600">Not uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
