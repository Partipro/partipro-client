import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MENUS } from "../../constants";
import MuiDrawer from "../navigation/Drawer.tsx";
import AppBar from "../feedback/AppBar.tsx";
import IconButton from "../inputs/IconButton.tsx";
import Block from "../layout/Block.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import Divider from "../layout/Divider.tsx";
import { Text } from "../data-display/Typography.tsx";
import List from "../data-display/List.tsx";
import { useLocation, useNavigate } from "react-router-dom";

function MenuContent() {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(
    location.pathname.split("/")[1] || "contract"
  );
  const [open, setOpen] = useState(true);

  const currentRoute = location.pathname.split("/")[1];

  useEffect(() => {
    navigate(`/${currentRoute}`);
  }, []);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    navigate(`/${tab}`);
  };

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <FlexRow>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        label="Mini variant drawer"
        action={
          !open && (
            <Block sx={{ marginRight: "5px" }}>
              <IconButton
                type="inherit"
                onClick={handleToggleDrawer}
                edge="start"
                icon={<MenuIcon />}
              />
            </Block>
          )
        }
      />
      <MuiDrawer
        variant="permanent"
        open={open}
        header={
          <IconButton
            onClick={handleToggleDrawer}
            icon={
              theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            }
          />
        }
      >
        <Divider />
        <List
          datasource={MENUS}
          renderItems={({ label, Icon, value }) => (
            <List.ItemButton
              selected={currentTab === value}
              open={open}
              onClick={() => handleTabChange(value)}
              key={value}
            >
              <List.ItemIcon icon={<Icon />} open={open} />
              {open && <Text label={label} />}
            </List.ItemButton>
          )}
        />
      </MuiDrawer>
    </FlexRow>
  );
}

export default MenuContent;
