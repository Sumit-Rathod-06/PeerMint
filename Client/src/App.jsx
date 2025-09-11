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

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route
          index
          element={
              <Landingpage />
          }
        />
        <Route
          path="home"
          element={
              <Borrowerdashboardpage />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
