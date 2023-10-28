import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { COLORS } from "../../constants";
import MuiDrawer from "../navigation/Drawer.tsx";
import AppBar from "../feedback/AppBar.tsx";
import IconButton from "../inputs/IconButton.tsx";
import Block from "../layout/Block.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import Divider from "../layout/Divider.tsx";
import { Text } from "../data-display/Typography.tsx";
import List from "../data-display/List.tsx";
import useMediaQuery, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../../hooks/useMediaQuery.tsx";
import Button from "../inputs/Button.tsx";
import FlexColumn from "../layout/FlexColumn.tsx";
import Avatar from "../data-display/Avatar.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Menu from "../navigation/Menu.tsx";

function MenuContent() {
  const theme = useTheme();
  const { user, handleLogout } = useAuth();
  const [isDesktop] = useMediaQuery(MEDIA_QUERY_BREAKPOINTS.MD);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(
    location.pathname.split("/")[1] || "contract",
  );
  const [open, setOpen] = useState(isDesktop);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

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
        action: "Novo imóvel",
      },
      {
        label: "Locatários",
        value: "renters",
        icon: ({ color = COLORS.SECONDARY }: { color?: string }) => (
          <PersonIcon sx={{ color }} />
        ),
        action: "Novo locatário",
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

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    handleLogout();
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
        extra={
          menus.find((menu) => menu.value === currentRoute)?.action && (
            <Button
              label={menus.find((menu) => menu.value === currentRoute)?.action}
              size="small"
              onClick={() => navigate(`/${currentRoute}/new`)}
              startIcon={<AddCircleOutlineOutlinedIcon />}
            />
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
        <FlexColumn
          sx={{
            position: "fixed",
            bottom: "10px",
            width: "inherit",
            textAlign: "center",
            gap: "10px",
          }}
        >
          <Divider />
          <FlexRow
            sx={{
              gap: "10px",
              overflow: "hidden",
              maxWidth: "160px",
            }}
            aligned
          >
            <IconButton
              onClick={handleMenuOpen}
              icon={<Avatar clickable src="" alt="profile" />}
            />
            {open && (
              <Text label={user?.name || ""} weight="medium" type="secondary" />
            )}
          </FlexRow>
        </FlexColumn>
      </MuiDrawer>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        menus={[
          {
            label: "Planos",
            onClick: () => navigate("/plans"),
            icon: <CurrencyExchangeIcon />,
          },
          {
            label: "Sair",
            onClick: handleLogoutClick,
            icon: <LogoutIcon />,
          },
        ]}
      />
      <FlexRow
        sx={{
          width: isDesktop ? "calc(100vw - 180px)" : "100vw",
        }}
      >
        <FlexRow
          sx={{
            margin: "90px 24px",
            height: "100%",
            width: "100%",
          }}
        >
          <Outlet />
        </FlexRow>
      </FlexRow>
    </FlexRow>
  );
}

export default MenuContent;
