import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";

import { Dashboard } from "@/layouts";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AuthRequired from "./AuthRequired";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard/*",
    element: (
      <AuthRequired>
        <DashboardLayout />
      </AuthRequired>
    ),
    children: [
      {
        path: "/dashboard/*",
        element: <Dashboard />,
      },
    ],
  },
]);
