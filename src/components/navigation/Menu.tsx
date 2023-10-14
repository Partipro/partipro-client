import MuiMenu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Text } from "../data-display/Typography.tsx";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";

type Props = {
  anchorEl?: MenuProps["anchorEl"];
  open: boolean;
  onClose?: () => void;
  menus: [{ onClick: () => void; label: string; icon?: React.ReactNode }];
  position?: MenuProps["anchorOrigin"];
};

function Menu({
  menus,
  position = { vertical: "center", horizontal: "right" },
  ...props
}: Props) {
  return (
    <MuiMenu anchorOrigin={position} {...props}>
      {menus.map((menu) => (
        <MenuItem onClick={menu.onClick} key={menu.label}>
          {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
          <Text label={menu.label} />
        </MenuItem>
      ))}
    </MuiMenu>
  );
}

export default Menu;
