import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import { authRoutes, protectedRoutes } from "./routes.tsx";
import { COLORS } from "./constants";
import { useAuth } from "./context/AuthContext.tsx";
import FlexRow from "./components/layout/FlexRow.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    warning: {
      main: COLORS.WARNING,
    },
  },
});

function ProtectedApp() {
  return (
    <FlexRow>
      <RouterProvider router={protectedRoutes} />
    </FlexRow>
  );
}

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated ? (
          <ProtectedApp />
        ) : (
          <RouterProvider router={authRoutes} />
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
