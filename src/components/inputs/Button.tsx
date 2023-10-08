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
  htmlType?: "submit" | "button";
};

function Button({
  variant = "contained",
  label,
  htmlType = "button",
  ...props
}: Props): React.ReactNode {
  return (
    <MuiButton {...props} type={htmlType} variant={variant}>
      {label}
    </MuiButton>
  );
}

export default Button;
