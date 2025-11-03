import { useState } from "react";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";

export default function UserTabs() {
  const [tab, setTab] = useState("borrowers");

  // Filter States
  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState("All");
  const [accountFilter, setAccountFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const handleClearFilters = () => {
    setSearch("");
    setKycFilter("All");
    setAccountFilter("All");
    setDateFilter("All");
  };

  return (
    <div className="bg-gray-100 p-5 rounded-xl text-black">
      {/* Tabs */}
      <div className="flex gap-5 mb-5 border-b border-gray-700 pb-3">
        {["borrowers", "lenders"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`pb-2 capitalize ${
              tab === item
                ? "text-teal-400 font-semibold border-b-2 border-teal-400"
                : "text-gray-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Filters */}
      <UserFilters
        search={search}
        setSearch={setSearch}
        kycFilter={kycFilter}
        setKycFilter={setKycFilter}
        accountFilter={accountFilter}
        setAccountFilter={setAccountFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        clearFilters={handleClearFilters}
      />

      {/* Table */}
      <UserTable
        userType={tab}
        search={search}
        kycFilter={kycFilter}
        accountFilter={accountFilter}
        dateFilter={dateFilter}
      />
    </div>
  );
}
