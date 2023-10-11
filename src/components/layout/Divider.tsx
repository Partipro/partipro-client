import React from "react";
import MuiDivider from "@mui/material/Divider";

function Divider({ children }: { children?: React.ReactNode }) {
  return <MuiDivider>{children}</MuiDivider>;
}

export default Divider;
