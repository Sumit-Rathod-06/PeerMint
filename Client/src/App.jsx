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
import KYCform from "./pages/KYCform";
import BorrowerLayout from "./layouts/BorrowerLayout";
import LoanApplicationForm from "./pages/LoanApplicationForm";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Landingpage />} />
        <Route path="borrower" element={<BorrowerLayout />}>
          <Route index element={<Borrowerdashboardpage />} />
          <Route path="kyc" element={<KYCform />} />
          <Route path="loan" element={<LoanApplicationForm />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
