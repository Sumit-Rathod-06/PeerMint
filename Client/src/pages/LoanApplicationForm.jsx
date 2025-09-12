"use client"
import LoanApplication from "../components/Borrower_Dashboard/LoanApplication/LoanApplication"

export default function LoanApplicationForm() {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-5xl ml-80 px-4">
        <LoanApplication />
      </div>
    </div>
  )
}