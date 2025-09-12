import React,{useState} from "react";

const DocumentUpload = ({ data, updateData, onSubmit, onBack }) => {
  const [dragActive, setDragActive] = useState({});
  const [agreed, setAgreed] = useState(false);

  const handleDrag = (e, uploadType) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [uploadType]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [uploadType]: false }));
    }
  };

  const handleDrop = (e, uploadType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [uploadType]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], uploadType);
    }
  };

  const handleFileInput = (e, uploadType) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], uploadType);
    }
  };

  const handleFile = (file, uploadType) => {
    // Validate file type and size
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only JPG, PNG, or PDF files");
      return;
    }

    if (file.size > maxSize) {
      alert("File size should be less than 5MB");
      return;
    }

    updateData({ [uploadType]: file });
  };

  const handleSubmit = () => {
    if (!data.photo || !data.identityDoc || !data.addressProof) {
      alert("Please upload all required documents");
      return;
    }

    if (!agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    onSubmit();
  };

  const UploadArea = ({ uploadType, title, subtitle, file }) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      {subtitle && <p className="text-xs text-gray-500 mb-3">{subtitle}</p>}

      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${
            dragActive[uploadType]
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300"
          }
          ${
            file
              ? "bg-indigo-50 border-indigo-300"
              : "hover:border-indigo-400 hover:bg-indigo-50"
          }
        `}
        onDragEnter={(e) => handleDrag(e, uploadType)}
        onDragLeave={(e) => handleDrag(e, uploadType)}
        onDragOver={(e) => handleDrag(e, uploadType)}
        onDrop={(e) => handleDrop(e, uploadType)}
      >
        <input
          type="file"
          id={uploadType}
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => handleFileInput(e, uploadType)}
        />

        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          {file ? (
            <div className="text-indigo-500">
              <p className="font-medium">✓ {file.name}</p>
              <p className="text-sm">File uploaded successfully</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                Accepted formats: JPG, PNG, PDF • Max size: 5MB
              </p>
              <label
                htmlFor={uploadType}
                className="mt-3 inline-block px-4 py-2 bg-indigo-500 text-white text-sm rounded-md cursor-pointer hover:bg-indigo-700"
              >
                Choose File
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Identity & Address Proof
      </h2>
      <p className="text-gray-500 mb-6">
        Please upload clear, colored scans or photos of the following documents.
        (Accepted formats: JPG, PNG, PDF)
      </p>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <UploadArea
            uploadType="photo"
            title="Your Photo"
            subtitle={"Upload a recent passport-sized photograph"}
            file={data.photo}
          />

          <UploadArea
            uploadType="identityDoc"
            title="Identity Documents"
            subtitle="Upload a clear copy of your PAN card"
            file={data.identityDoc}
          />
        </div>

        <div>
          <UploadArea
            uploadType="addressProof"
            title="Address Proof"
            subtitle="Upload the front side of your Aadhaar card"
            file={data.addressProof}
          />
        </div>
      </div>

      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500 mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            I confirm that the details and documents provided are true and
            belong to me. I understand that providing false information may
            result in rejection of my application and legal consequences.
          </span>
        </label>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit for Verification
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
