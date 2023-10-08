import MuiGrid from "@mui/material/Grid";
import React from "react";

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  spacing?: 1 | 2 | 4 | 8 | 12;
  children?: React.ReactNode;
  sm?: GridSpan;
  xs?: GridSpan;
  md?: GridSpan;
  lg?: GridSpan;
  xl?: GridSpan;
};

function Grid({ spacing = 2, children, ...props }: Props) {
  return (
    <MuiGrid container spacing={spacing}>
      <MuiGrid item {...props}>
        {children}
      </MuiGrid>
    </MuiGrid>
  );
}

export default Grid;
