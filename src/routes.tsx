import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const Register = lazy(
  () => import("./screens/Authentication/screens/Register.tsx"),
);

const router = createBrowserRouter([
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/register" replace />,
  },
]);

export default router;
