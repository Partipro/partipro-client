import MuiGrid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  spacing?: 1 | 2 | 4 | 8 | 12;
  items: {
    item: React.ReactNode;
    sm?: GridSpan;
    xs?: GridSpan;
    md?: GridSpan;
    lg?: GridSpan;
    xl?: GridSpan;
  }[];
};

function Grid({ spacing = 2, items }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiGrid container spacing={spacing}>
        {items.map(({ item, ...span }) => (
          <MuiGrid item {...span}>
            {item}
          </MuiGrid>
        ))}
      </MuiGrid>
    </Box>
  );
}

export default Grid;
