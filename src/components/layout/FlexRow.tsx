import React from "react";
import MuiBox, { BoxProps } from "@mui/material/Box";

type Props = {
  sx?: BoxProps["sx"];
  aligned?: boolean;
  justified?: boolean;
  children?: React.ReactNode;
};

function FlexRow({ children, aligned, justified, sx }: Props) {
  return (
    <MuiBox
      sx={{
        ...sx,
        ...(aligned ? { alignItems: "center" } : {}),
        ...(justified ? { justifyContent: "center" } : {}),
        display: "flex",
      }}
    >
      {children}
    </MuiBox>
  );
}

export default FlexRow;
