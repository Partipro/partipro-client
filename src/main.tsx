import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes.tsx";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#0a5694",
    },
    secondary: {
      main: "#E33E7F",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
