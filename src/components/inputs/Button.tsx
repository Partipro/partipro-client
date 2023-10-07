import MuiButton from "@mui/material/Button";
import React from "react";

type Props = {
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
  label?: string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

function Button({
  variant = "contained",
  label,
  ...props
}: Props): React.ReactNode {
  return (
    <MuiButton variant={variant} {...props}>
      {label}
    </MuiButton>
  );
}

export default Button;
