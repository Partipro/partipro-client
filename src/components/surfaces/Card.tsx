import React from "react";
import MuiCard from "@mui/material/Card";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import Block from "../layout/Block.tsx";
import FlexRow from "../layout/FlexRow.tsx";

type Props = {
  src?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  info?: React.ReactNode;
  fullHeight?: boolean;
};

function Card({ src, title, children, actions, info, fullHeight }: Props) {
  return (
    <MuiCard
      sx={{
        position: "relative",
        overflow: "visible !important",
        ...(fullHeight ? { height: "100%" } : {}),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {info && (
          <Block sx={{ position: "absolute", top: "-10px", right: "-20px" }}>
            {info}
          </Block>
        )}
        {src && <CardMedia height={150} component="img" image={src} />}
        <CardContent>
          <FlexRow sx={{ justifyContent: "start" }}>{title}</FlexRow>
          {children}
        </CardContent>
      </div>
      {actions && (
        <CardActions sx={{ justifyContent: "end" }}>{actions}</CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
