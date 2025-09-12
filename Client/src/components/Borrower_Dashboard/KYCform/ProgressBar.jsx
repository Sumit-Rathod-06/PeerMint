import React from 'react'

const ProgressBar = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      title: "Personal Identity",
      subtitle: "Identity Verification",
    },
    {
      number: 2,
      title: "Address Details",
      subtitle: "Residential Information",
    },
    {
      number: 3,
      title: "Document Upload",
      subtitle: "Upload Identity & Address Proof",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Verification Progress</h3>
        <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-indigo-200 rounded">
          <div
            className="h-full bg-indigo-500 rounded transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mb-3 relative z-10
                ${
                  step.number < currentStep
                    ? "bg-indigo-500"
                    : step.number === currentStep
                      ? "bg-indigo-500"
                      : "bg-gray-300"
                }
              `}
              >
                {step.number < currentStep ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">{step.title}</div>
                <div className="text-xs text-gray-500">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
