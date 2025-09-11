import React from 'react'
import Card from './Card'
import { Percent, Rocket, Eye } from "lucide-react"; // icons
const Funds = () => {
  return (
    <div id="funds" className="w-full py-16 px-6">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Access Funds on Your Terms
        </h2>
        <p className="text-gray-600">
          Get the funding you need with transparent terms and competitive rates.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        <Card
          icon={<Percent />}
          title="Lower Interest Rates"
          description="Our data-driven risk assessment allows us to offer competitive rates that beat traditional lenders."
        />
        <Card
          icon={<Rocket />}
          title="Quick & Easy Application"
          description="Apply online in minutes with minimal paperwork. Get approved faster than traditional banks."
        />
        <Card
          icon={<Eye />}
          title="No Hidden Fees"
          description="Complete transparency on all fees and charges. What you see is what you get, always."
        />
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-3 bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition">
          Check Your Eligibility
        </button>
      </div>
       
    </div>
  )
}
export default Funds;