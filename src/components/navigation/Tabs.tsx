import React from "react";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type Props<V> = {
  variant?: "scrollable" | "standard" | "fullWidth";
  onChange?: (event: React.SyntheticEvent, newValue: V) => void;
  value?: V;
  tabs: {
    label: string;
    value: V;
    onChange?: (e: React.FormEvent<HTMLDivElement>) => void;
    onClick?: (e: React.FormEvent<HTMLDivElement>) => void;
  }[];
  orientation?: "vertical" | "horizontal";
};

function Tabs<V>({
  variant = "scrollable",
  orientation = "vertical",
  tabs,
  ...props
}: Props<V>) {
  return (
    <MuiTabs orientation={orientation} variant={variant} {...props}>
      {tabs.map((tab, i) => (
        <Tab
          key={tab.value as string}
          sx={{ padding: "14px 30px" }}
          {...tab}
          tabIndex={i}
        />
      ))}
    </MuiTabs>
  );
}

export default Tabs;
