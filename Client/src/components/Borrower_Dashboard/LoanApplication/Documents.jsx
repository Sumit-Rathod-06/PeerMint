export default function Documents({ formData, updateFormData }) {
  const handleFileUpload = (documentType, file) => {
    const newDocuments = { ...formData.documents }
    newDocuments[documentType] = file
    updateFormData({ documents: newDocuments })
  }

  const FileUploadArea = ({ title, subtitle, documentType, required = false }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
      <div className="mb-4">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mb-2">
        <p className="text-sm font-medium text-gray-700">
          {title} {required && <span className="text-red-500">*</span>}
        </p>
        <p className="text-xs text-gray-500 mb-4">{subtitle}</p>
      </div>
      <div className="mb-4">
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">Click to upload or drag and drop</button>
      </div>
      <p className="text-xs text-gray-500">Accepted formats: .pdf, .jpg, .jpeg, .png • Max size: 5MB</p>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Documents</h2>
      <p className="text-gray-600 mb-6">
        Please upload clear, readable copies of the required documents. All documents should be in PDF, JPG, or PNG
        format.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Income Proof</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Last 2 Years' Income Tax Returns (ITR) or Salary Slips <span className="text-red-500">*</span>
              </h4>
              <p className="text-xs text-gray-500 mb-5">Upload your ITR documents or salary slips to verify your income. </p>
              <FileUploadArea
                title="Income Proof Document"
                subtitle=""
                documentType="incomeProof"
                required={true}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bank Statement</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Last 6 Month's Bank Statement <span className="text-red-500">*</span>
              </h4>
              <p className="text-xs text-gray-500 mb-5">Upload your last 6 month's bank statement from your net-banking portal (preferably PDF format)</p>
              <FileUploadArea
                title="Bank Statement Document"
                subtitle=""
                documentType="bankStatement"
                required={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
