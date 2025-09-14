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
import AdminDashboard from "./pages/AdminDashboard";
import KYCManagement from "./pages/AdminKYCManagement";
import LoanManagement from "./pages/AdminLoanManagement";
import LoginPage from "./components/Login&Register/Login";
import KYCform from "./pages/KYCform";
import BorrowerLayout from "./layouts/BorrowerLayout";
import LoanApplicationForm from "./pages/LoanApplicationForm";
import RegisterPage from "./components/Login&Register/Register";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Landingpage />} />

        <Route path="admin" >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="KYCManagement" element={<KYCManagement />} />
          <Route path="loansmanagement" element={<LoanManagement />} />
        </Route>

        <Route path="borrower" element={<BorrowerLayout />}>
          <Route path="dashboard" element={<Borrowerdashboardpage />} />
          <Route path="loan-application" element={<LoanApplicationForm />} />
          <Route path="kyc-form" element={<KYCform />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
