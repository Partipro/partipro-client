import React from "react";
import MuiButton from "@mui/material/Button";

export type ButtonProps = {
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
  label?: string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "submit" | "button";
  type?: "primary" | "secondary" | "success" | "info";
  size?: "small" | "medium" | "large";
};

function Button({
  variant = "contained",
  size = "medium",
  label,
  htmlType = "button",
  type = "primary",
  ...props
}: ButtonProps): React.ReactNode {
  return (
    <MuiButton
      {...props}
      size={size}
      color={type}
      type={htmlType}
      variant={variant}
    >
      {label}
    </MuiButton>
  );
}

export default Button;
