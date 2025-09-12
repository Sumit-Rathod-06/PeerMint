import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Landingpage from "./pages/Landingpage";
import Borrowerdashboardpage from "./pages/Borrowerdashboardpage";
import AdminSidebar from "./components/Admin_Dashboard/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import KYCManagement from "./pages/AdminKYCManagement";
import LoanManagement from "./pages/AdminLoanManagement";
import LoginPage from "./components/Login&Register/Login";
const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
              <Landingpage />
          }
        />
        <Route
          path="home"
          element={
              <AdminDashboard />
          }
        />
        <Route
          path="nohome"
          element={
              <Borrowerdashboardpage />
          }
        />
        <Route
          path="farfromhome"
          element={
              <KYCManagement />
          }
        />
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="adminKYCManagement" element={<KYCManagement />} />
        <Route path="adminLoansManagement" element={<LoanManagement />} />
        <Route path="adminUsers" element={<AdminDashboard />} />
        <Route path="adminTransactions" element={<AdminDashboard />} />
        <Route path="adminSettings" element={<AdminDashboard />} />
        <Route path="login" element={<LoginPage/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
