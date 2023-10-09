import React from "react";
import MuiButton from "@mui/material/Button";

type Props = {
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
  label?: string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "submit" | "button";
  type?: "primary" | "secondary" | "success" | "info";
};

function Button({
  variant = "contained",
  label,
  htmlType = "button",
  type = "primary",
  ...props
}: Props): React.ReactNode {
  return (
    <MuiButton {...props} color={type} type={htmlType} variant={variant}>
      {label}
    </MuiButton>
  );
}

export default Button;
