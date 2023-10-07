import { createBrowserRouter } from "react-router-dom";
import Register from "./screens/Authentication/screens/Register.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);

export default router;
