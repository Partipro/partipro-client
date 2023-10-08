import React from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import Alert from "./Alert.tsx";

type Props = {
  autoHideDuration?: number;
  open: boolean;
  message: string;
  type: "error" | "success";
  onClose?: (event: React.SyntheticEvent | Event, reason?: string) => void;
};

function Snackbar({ type, message, autoHideDuration = 6000, ...props }: Props) {
  return (
    <MuiSnackbar
      {...props}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={autoHideDuration}
    >
      {type === "error" ? (
        <Alert severity="error">{message}</Alert>
      ) : (
        <Alert severity="success">{message}</Alert>
      )}
    </MuiSnackbar>
  );
}

export default Snackbar;
