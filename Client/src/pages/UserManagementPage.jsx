import Sidebar from "../components/Admin_Dashboard/Sidebar";
import StatCards from "../components/Admin_Dashboard/users/StatCards";
import UserFilters from "../components/Admin_Dashboard/users/UserFilters";
import UserTabs from "../components/Admin_Dashboard/users/UserTabs";

export default function UserManagementPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-400 text-sm">
            Manage borrowers and lenders, verify KYC, and control account access
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mt-6">
          <StatCards />
        </div>

        {/* Filters */}
        {/* <div className="mt-6">
          <UserFilters />
        </div> */}

        {/* Tabs + Table */}
        <div className="mt-6">
          <UserTabs />
        </div>
      </div>
    </div>
  );
}
