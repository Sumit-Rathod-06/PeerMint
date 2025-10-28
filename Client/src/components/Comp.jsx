import React, { useState } from 'react';

export default function PDFViewer() {
  const pdfUrl = "https://res.cloudinary.com/dctuvwgxj/raw/upload/v1761318824/peermint_docs/klpb2zc2am9qmqbjtu7a";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Use PDF.js viewer hosted on CDN
  const pdfJsViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">PDF Preview</h1>
        <a 
          href={pdfUrl}
          download
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </a>
      </div>
      
      <div className="flex-1 p-4 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold">Failed to load PDF</p>
              <p className="mt-2">Please try downloading the file instead.</p>
            </div>
          </div>
        )}
        
        <iframe
          src={pdfJsViewerUrl}
          className="w-full h-full border-2 border-gray-300 rounded-lg shadow-lg bg-white"
          title="PDF Document Preview"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
}