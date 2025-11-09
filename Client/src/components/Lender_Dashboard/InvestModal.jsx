import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../assets/assests";

export default function InvestModal({ isOpen, onClose, loan, refreshLoans }) {
  const [loading, setLoading] = useState(false);
  console.log("InvestModal - isOpen:", isOpen, "loan:", loan);
  if (!isOpen || !loan) return null;

  const handleConfirm = async () => {

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/api/lender/fund-loan`, {
        applicationId: loan.id,
        fundedAmount: loan.amount,
        interestRate: loan.rate,
        loanTenure: parseInt(loan.tenure),
        emi : loan.estimatedemi,
        payableAmount : loan.totalAmount,
      },
    {
    headers: { Authorization: `Bearer ${token}` },
  });

      if (res.data.success) {
        alert("✅ Investment successful!");
        onClose();
        refreshLoans(); // refresh data
      } else {
        alert("⚠️ " + res.data.message);
      }
    } catch (err) {
      console.error("Error funding loan:", err);
      alert("❌ Error funding loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

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

        <h2 className="text-xl font-semibold mb-4">Confirm Investment</h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Borrower:</strong> {loan.name}</p>
          <p><strong>Purpose:</strong> {loan.purpose}</p>
          <p><strong>Amount:</strong> ₹{loan.amount}</p>
          <p><strong>Interest Rate:</strong> {loan.rate}% p.a.</p>
          <p><strong>Emi:</strong>{loan.estimatedemi}</p>
          <p><strong>Tenure:</strong> {loan.tenure} months</p>
          <p><strong>Total payable amount: </strong>{loan.totalAmount}</p>
          <p><strong>Risk Grade:</strong> {loan.risk}</p>
        </div>

        {/* <div className="mt-4">
          <label className="block text-sm font-medium">Investment Amount (₹)</label>
          <input
            type="number"
            min="1000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Enter amount"
          />
        </div> */}

        <div className="flex justify-end mt-5 space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
