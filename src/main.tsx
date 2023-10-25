import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import AuthContext from "./context/AuthContext.tsx";
import NotificationContext from "./context/NotificationContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <AuthContext>
          <NotificationContext>
            <App />
          </NotificationContext>
        </AuthContext>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
