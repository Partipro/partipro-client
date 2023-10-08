import React from "react";
import Tabs from "@mui/material/Tabs";
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
};

function VerticalTabs<V>({ variant = "scrollable", tabs, ...props }: Props<V>) {
  return (
    <Tabs orientation="vertical" variant={variant} {...props}>
      {tabs.map((tab, i) => (
        <Tab {...tab} tabIndex={i} />
      ))}
    </Tabs>
  );
}

export default VerticalTabs;
