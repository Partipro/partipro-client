import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { CSSObject, styled, Theme } from "@mui/material/styles";

type MuiDrawerProps = {
  anchor?: "left" | "right";
  onClose?: () => void;
  onOpen?: () => void;
  variant?: "permanent" | "temporary";
  children?: React.ReactNode;
  header?: React.ReactNode;
};

const drawerWidth = 180;

const openedMixin = (theme: Theme, background?: string): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background,
  overflowX: "hidden",
});

const closedMixin = (theme: Theme, background?: string): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
  background?: string;
}

const StyledDrawer = styled(MuiDrawer)<DrawerProps>(
  ({ theme, open, background = "#ffffff" }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, background),
      "& .MuiDrawer-paper": openedMixin(theme, background),
    }),
    ...(!open && {
      ...closedMixin(theme, background),
      "& .MuiDrawer-paper": closedMixin(theme, background),
    }),
  }),
);

function Drawer({ children, header, background, ...props }: DrawerProps) {
  return (
    <StyledDrawer background={background} {...props}>
      {header && <DrawerHeader>{header}</DrawerHeader>}
      {children}
    </StyledDrawer>
  );
}

export default Drawer;
