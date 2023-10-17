import React from "react";
import MuiCard from "@mui/material/Card";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { Title } from "../data-display/Typography.tsx";
import Block from "../layout/Block.tsx";

type Props = {
  src?: string;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  info?: React.ReactNode;
};

function Card({ src, title, children, actions, info }: Props) {
  return (
    <MuiCard sx={{ position: "relative", overflow: "visible !important" }}>
      {info && (
        <Block sx={{ position: "absolute", top: "-10px", right: "-20px" }}>
          {info}
        </Block>
      )}
      {src && <CardMedia component="img" image={src} />}
      <CardContent>
        {title && <Title label={title} weight="strong" level={4} />}
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
}

export default Card;
