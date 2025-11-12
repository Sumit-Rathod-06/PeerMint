import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../assets/assests";

export default function InvestModal({ isOpen, onClose, loan, refreshLoans }) {
  if (!isOpen || !loan) return null;
  const [loading, setLoading] = useState(false);
  const [customRate, setCustomRate] = useState("");
  const [customTenure, setCustomTenure] = useState("");
  const [estimatedEMI, setEstimatedEMI] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    if (loan) {
      setCustomRate(loan.rate || 15);
      setCustomTenure(loan.tenure || 12);
      calculateEMI(loan.amount, loan.rate || 15, loan.tenure || 12);
    }
  }, [loan]);

  

  // 🧮 EMI Calculation (same as borrower's)
  const calculateEMI = (principal, annualRate, tenureMonths) => {
    if (!principal || !annualRate || !tenureMonths) return;
    const rate = annualRate / 100 / 12;
    const n = tenureMonths;
    const emi = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const roundedEMI = Math.round(emi);
    const total = Math.round(roundedEMI * n);
    setEstimatedEMI(roundedEMI);
    setTotalPayable(total);
  };

  // 🔁 Recalculate EMI when rate or tenure changes
  useEffect(() => {
    calculateEMI(loan.amount, customRate, customTenure);
  }, [customRate, customTenure]);

  const handleSubmitOffer = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/api/lender/offer-loan`,
        {
          loanId: loan.id,
          offeredAmount: loan.amount,
          offeredInterestRate: parseFloat(customRate),
          offeredTenure: parseInt(customTenure),
          estimatedEmi: estimatedEMI,
          payableAmount: totalPayable,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("✅ Offer submitted successfully!");
        onClose();
        refreshLoans();
      } else {
        alert("⚠️ " + res.data.message);
      }
    } catch (err) {
      console.error("Error submitting offer:", err);
      alert("❌ Error submitting offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>

        <div className="space-y-2 text-gray-700 text-sm mb-4">
          <p><strong>Borrower:</strong> {loan.name}</p>
          <p><strong>Purpose:</strong> {loan.purpose}</p>
          <p><strong>Requested Amount:</strong> ₹{loan.amount.toLocaleString()}</p>
          <p><strong>Risk Grade:</strong> {loan.risk}</p>
        </div>

        {/* Editable Offer Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Interest Rate (%)</label>
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(Number(e.target.value))}
              min="5"
              max="30"
              step="0.1"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tenure (Months)</label>
            <input
              type="number"
              value={customTenure}
              onChange={(e) => setCustomTenure(Number(e.target.value))}
              min="6"
              max="60"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* EMI Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Offer Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Loan Amount:</span>
            <span>₹{loan.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Interest Rate:</span>
            <span>{customRate}% p.a.</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Tenure:</span>
            <span>{customTenure} months</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Estimated EMI:</span>
            <span>₹{estimatedEMI.toLocaleString()}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Payable:</span>
            <span>₹{totalPayable.toLocaleString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitOffer}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Offer"}
          </button>
        </div>
      </div>
    </div>
  );
}
