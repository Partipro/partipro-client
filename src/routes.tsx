import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MenuContent from "./components/others/MenuContent.tsx";
import PropertiesForm from "./screens/Properties/screens/PropertiesForm.tsx";

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
        children: [
          {
            path: "new",
            element: <PropertiesForm />,
          },
          {
            path: ":id",
            element: <PropertiesForm />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/contracts" replace />,
  },
]);

export { authRoutes, protectedRoutes };
