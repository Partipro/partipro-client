import React from "react";
import Box from "@mui/material/Box";
import MuiStack from "@mui/material/Stack";

type Props = {
  spacing?: number;
  children?: React.ReactNode;
  margin?: number;
};

function Stack({ spacing = 2, margin, children }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <MuiStack margin={margin} spacing={spacing}>
        {children}
      </MuiStack>
    </Box>
  );
}

export default Stack;
