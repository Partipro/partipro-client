import React from "react";
import MuiStack from "@mui/material/Stack";

type Props = {
  spacing?: number;
  children?: React.ReactNode;
};

function Stack({ spacing = 2, children }: Props) {
  return <MuiStack spacing={spacing}>{children}</MuiStack>;
}

export default Stack;
