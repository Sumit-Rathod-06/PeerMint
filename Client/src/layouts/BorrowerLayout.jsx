import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Borrower_Dashboard/Sidebar";
import Header from "../components/Borrower_Dashboard/Header";

const BorrowerLayout = () => {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
};

export default BorrowerLayout;
