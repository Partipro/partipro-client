import React from "react";
import MuiIconButton, { IconButtonProps } from "@mui/material/IconButton";

type Props = {
  onClick?: IconButtonProps["onClick"];
  icon: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "primary" | "secondary" | "success" | "info" | "inherit" | "error";
  size?: "small" | "medium" | "large";
  edge?: false | "start" | "end" | undefined;
};

function IconButton({
  size = "medium",
  type = "primary",
  icon,
  ...props
}: Props): React.ReactNode {
  return (
    <MuiIconButton {...props} size={size} color={type}>
      {icon}
    </MuiIconButton>
  );
}

export default IconButton;
