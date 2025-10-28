import React from "react";
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
import PrivateRoute from "./components/PrivateRoute";
import LenderLayout from "./layouts/LenderLayout";
import LenderDashboardPage from "./pages/LenderDashboardPage";
import Investment from "./pages/Investment";
import InvestForm from "./pages/InvestForm";
import LenderProfilePage from "./pages/LenderProfilePage"; // ✅ FIXED PATH
import LenderEarningsPage from "./pages/LenderEarningsPage";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Landingpage />} />

        {/* Admin Routes */}
        <Route path="admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="KYCManagement" element={<KYCManagement />} />
          <Route path="loansmanagement" element={<LoanManagement />} />
        </Route>

        {/* Borrower Routes */}
        <Route path="borrower" element={<BorrowerLayout />}>
          <Route path="dashboard" element={<Borrowerdashboardpage />} />
          <Route path="loan-application" element={<LoanApplicationForm />} />
          <Route path="kyc-form" element={<KYCform />} />
        </Route>

        {/* Lender Routes */}
        <Route path="lender" element={<LenderLayout />}>
          <Route path="dashboard" element={<LenderDashboardPage />} />
          <Route path="invest" element={<InvestForm />} />
          <Route path="my-investment" element={<Investment />} />
          <Route path="profile" element={<LenderProfilePage />} /> {/* ✅ Added */}
          <Route path="earnings" element={<LenderEarningsPage />} />

        </Route>

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
