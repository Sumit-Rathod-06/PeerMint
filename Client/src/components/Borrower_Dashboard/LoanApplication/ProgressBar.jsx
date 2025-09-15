export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-600">
          Application Progress
        </h3>
        <span className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </span>
      </div>

      <div className="relative">
        <div className="absolute top-5 left-10 right-6 h-1 bg-indigo-200 rounded">
          <div
            className="h-full bg-indigo-400 rounded transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-11 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep
                    ? "bg-indigo-400 text-white"
                    : step.id === currentStep
                    ? "bg-indigo-400 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.id < currentStep ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-600">
                  {step.title}
                </div>
                <div className="text-xs text-gray-600">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 -z-10">
          <div
            className="h-full bg-indigo-400 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
