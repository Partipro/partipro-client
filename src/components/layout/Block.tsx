import React from "react";
import MuiBox, { BoxProps } from "@mui/material/Box";

type Props = {
  sx?: BoxProps["sx"];
  children?: React.ReactNode;
};

function Block({ children, sx }: Props) {
  return (
    <MuiBox
      sx={{
        ...sx,
        display: "block",
      }}
    >
      {children}
    </MuiBox>
  );
}

export default Block;
