import React from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

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
    index?: number
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
