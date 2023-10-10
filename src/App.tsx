import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import { authRoutes, protectedRoutes } from "./routes.tsx";
import { COLORS } from "./constants";
import { useAuth } from "./context/AuthContext.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: "#E33E7F",
    },
  },
});

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider
          router={isAuthenticated ? protectedRoutes : authRoutes}
        />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
