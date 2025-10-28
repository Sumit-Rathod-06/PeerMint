import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Lender_Dashboard/Sidebar";
import Header from "../components/Lender_Dashboard/Header";

const LenderLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Fixed Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 mt-16 md:mt-20 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LenderLayout;
