import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { COLORS } from "../../constants";
import MuiDrawer from "../navigation/Drawer.tsx";
import AppBar from "../feedback/AppBar.tsx";
import IconButton from "../inputs/IconButton.tsx";
import Block from "../layout/Block.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import Divider from "../layout/Divider.tsx";
import { Text } from "../data-display/Typography.tsx";
import List from "../data-display/List.tsx";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import useMediaQuery, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../../hooks/useMediaQuery.tsx";

function MenuContent() {
  const theme = useTheme();
  const [isDesktop] = useMediaQuery(MEDIA_QUERY_BREAKPOINTS.MD);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(
    location.pathname.split("/")[1] || "contract",
  );
  const [open, setOpen] = useState(isDesktop);

  const currentRoute = location.pathname.split("/")[1];

  const menus = useMemo(() => {
    return [
      {
        label: "Contratos",
        value: "contracts",
        icon: ({ color = COLORS.SECONDARY }: { color?: string }) => (
          <DescriptionOutlinedIcon sx={{ color }} />
        ),
      },
      {
        label: "Imóveis",
        value: "properties",
        icon: ({ color = COLORS.SECONDARY }: { color?: string }) => (
          <HomeWorkOutlinedIcon sx={{ color }} />
        ),
      },
      {
        label: "Financeiro",
        value: "finances",
        icon: ({ color = COLORS.SECONDARY }: { color?: string }) => (
          <AttachMoneyOutlinedIcon sx={{ color }} />
        ),
      },
      {
        label: "Simuladores",
        value: "simulators",
        icon: ({ color = COLORS.SECONDARY }: { color?: string }) => (
          <CalculateOutlinedIcon sx={{ color }} />
        ),
      },
    ];
  }, []);

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
        titleIcon={menus
          .find((menu) => menu.value === currentRoute)
          ?.icon({ color: COLORS.PRIMARY })}
        label={menus.find((menu) => menu.value === currentRoute)?.label || ""}
        action={
          !open && (
            <Block sx={{ marginRight: "5px" }}>
              <IconButton
                onClick={handleToggleDrawer}
                edge="start"
                icon={<MenuIcon />}
              />
            </Block>
          )
        }
      />
      <MuiDrawer
        background={COLORS.PRIMARY}
        variant={isDesktop ? "permanent" : "temporary"}
        open={open}
        header={
          <IconButton
            onClick={handleToggleDrawer}
            icon={
              theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: COLORS.SECONDARY }} />
              ) : (
                <ChevronLeftIcon sx={{ color: COLORS.SECONDARY }} />
              )
            }
          />
        }
      >
        <Divider />
        <List
          datasource={menus}
          renderItems={({ label, icon, value }) => (
            <List.ItemButton
              selected={currentTab === value}
              open={open}
              onClick={() => handleTabChange(value)}
              key={value}
            >
              <List.ItemIcon icon={icon({})} open={open} />
              {open && <Text weight="medium" type="light" label={label} />}
            </List.ItemButton>
          )}
        />
      </MuiDrawer>
      <FlexRow sx={{ margin: "90px 24px" }}>
        <Outlet />
      </FlexRow>
    </FlexRow>
  );
}

export default MenuContent;
