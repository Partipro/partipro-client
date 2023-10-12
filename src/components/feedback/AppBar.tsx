import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

import { Title } from "../data-display/Typography.tsx";
import { COLORS } from "../../constants";
import FlexRow from "../layout/FlexRow.tsx";

const drawerWidth = 180;

type MuiAppBarProps = {
  action?: React.ReactNode;
  label: string;
  titleIcon?: React.ReactNode;
  extra?: React.ReactNode;
  position?: "fixed" | "absolute" | "static";
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<Omit<AppBarProps, "label" | "action" | "extra">>(({ theme, open }) => ({
  background: COLORS.SECONDARY,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBar({
  action,
  position,
  label,
  extra,
  open = false,
  titleIcon,
}: AppBarProps) {
  return (
    <StyledAppBar open={open} position={position}>
      <Toolbar>
        <FlexRow
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <FlexRow sx={{ width: "fit-content", alignItems: "center" }}>
            {action}
            <FlexRow sx={{ gap: "15px" }}>
              {titleIcon}
              <Title type="primary" level={4} weight="medium" label={label} />
            </FlexRow>
          </FlexRow>
          {extra}
        </FlexRow>
      </Toolbar>
    </StyledAppBar>
  );
}

export default AppBar;
