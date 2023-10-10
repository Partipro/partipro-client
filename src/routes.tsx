import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Contracts from "./screens/Contracts/screens/Contracts.tsx";

const Login = lazy(() => import("./screens/Authentication/screens/Login.tsx"));
const Register = lazy(
  () => import("./screens/Authentication/screens/Register.tsx"),
);

const authRoutes = createBrowserRouter([
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
]);

const protectedRoutes = createBrowserRouter([
  {
    path: "/contracts",
    element: <Contracts />,
  },
  {
    path: "*",
    element: <Navigate to="/contracts" replace />,
  },
]);

export { authRoutes, protectedRoutes };
