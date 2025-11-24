import { Search } from "lucide-react";

export default function UserFilters({
  search,
  setSearch,
  kycFilter,
  setKycFilter,
  accountFilter,
  setAccountFilter,
  dateFilter,
  setDateFilter,
  clearFilters,
}) {
  return (
    <div className="mb-5">
      <div className="flex gap-4 items-center flex-wrap">
        {/* Search */}
        <div className="flex items-center bg-gray-200 px-3 rounded-md flex-1 min-w-[250px]">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="bg-transparent text-sm focus:outline-none px-2 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <select
          className="bg-gray-200 px-3 py-2 text-sm rounded-md"
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>

        <select
          className="bg-gray-200 px-3 py-2 text-sm rounded-md"
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>

        <select
          className="bg-gray-200 px-3 py-2 text-sm rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option>All</option>
          <option>2024-01</option>
          <option>2024-02</option>
        </select>

        {/* Clear Button */}
        <button
          className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-500"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
