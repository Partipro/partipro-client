import React from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { createTheme, ThemeProvider } from "@mui/material";
import { COLORS } from "../../constants";

const muiTheme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "90% !important",
          margin: "auto",

          ".MuiButtonBase-root": {
            minHeight: "30px !important",
            borderRadius: "10px",
            margin: "9px 0",
            padding: "7px 22px !important",
          },

          ".Mui-selected": {
            backgroundColor: `${COLORS.SECONDARY} !important`,
          },

          ".Mui-selected .MuiTypography-root, .Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root":
            {
              color: `${COLORS.PRIMARY} !important`,
            },

          ".MuiListItemIcon-root": {
            marginRight: "0 !important",
          },

          ".MuiTypography-root": {
            marginLeft: "17px",
          },
        },
      },
    },
  },
});

type Props<D> = {
  datasource: D[];
  renderItems: (data: D) => React.ReactNode;
  renderAction?: (data: D) => React.ReactNode;
};

type ListFunctionType = <T>(props: Props<T>) => React.ReactElement;

type ItemButtonProps = {
  children?: React.ReactNode;
  open?: boolean;
  selected?: boolean;
  onClick?: (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index?: number,
  ) => void;
};

type ItemIconProps = {
  icon: React.ReactNode;
  open?: boolean;
};

interface IList extends ListFunctionType {
  ItemButton: React.FC<ItemButtonProps>;
  ItemIcon: React.FC<ItemIconProps>;
}

const List: IList = function List<D>({
  datasource,
  renderItems,
  renderAction,
}: Props<D>) {
  return (
    <ThemeProvider theme={muiTheme}>
      <MuiList>
        {datasource.map((data, i) => (
          <ListItem
            secondaryAction={renderAction?.(data)}
            key={i}
            disablePadding
            sx={{ display: "block" }}
          >
            {renderItems(data)}
          </ListItem>
        ))}
      </MuiList>
    </ThemeProvider>
  );
};

function ItemButton({ children, open, ...props }: ItemButtonProps) {
  return (
    <ListItemButton
      {...props}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      {children}
    </ListItemButton>
  );
}

function ItemIcon({ icon, open }: ItemIconProps) {
  return (
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
      }}
    >
      {icon}
    </ListItemIcon>
  );
}

List.ItemIcon = ItemIcon;
List.ItemButton = ItemButton;

export default List;
