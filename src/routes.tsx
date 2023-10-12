import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MenuContent from "./components/others/MenuContent.tsx";

const Contracts = lazy(
  () => import("./screens/Contracts/screens/Contracts.tsx"),
);
const Properties = lazy(
  () => import("./screens/Properties/screens/Properties.tsx"),
);
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
    element: <MenuContent />,
    children: [
      {
        path: "/contracts",
        element: <Contracts />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/contracts" replace />,
  },
]);

export { authRoutes, protectedRoutes };
