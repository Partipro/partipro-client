import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { COLORS } from "../../constants";

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

declare module "@mui/material/styles" {
  interface TypographyVariants {
    extraSmall: React.CSSProperties;
    small: React.CSSProperties;
    medium: React.CSSProperties;
    large: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    extraSmall?: React.CSSProperties;
    small?: React.CSSProperties;
    medium?: React.CSSProperties;
    large?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    extraSmall: true;
    small: true;
    medium: true;
    large: true;
  }
}

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: 36,
    },
    h2: {
      fontWeight: 700,
      fontSize: 30,
    },
    h3: {
      fontWeight: 700,
      fontSize: 24,
    },
    h4: {
      fontWeight: 700,
      fontSize: 20,
    },
    extraSmall: {
      fontSize: 9,
    },
    small: {
      fontSize: 12,
    },
    medium: {
      fontSize: 14,
    },
    large: {
      fontSize: 16,
    },
  },
});

type Props = {
  size?: "extraSmall" | "small" | "large" | "medium";
  weight?: "normal" | "strong" | "medium";
  label: string;
  type?: "dark" | "secondary" | "light" | "primary";
};

function Text({
  size = "medium",
  type = "dark",
  weight = "normal",
  label,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant={size}
        color={
          {
            secondary: "#A5A5A5",
            dark: "#000000",
            light: "#ffffff",
            primary: COLORS.PRIMARY,
          }[type]
        }
        fontWeight={{ medium: 500, strong: 700, normal: 400 }[weight]}
      >
        {label}
      </Typography>
    </ThemeProvider>
  );
}

type TitleProps = {
  level?: 1 | 2 | 3 | 4;
  label: string;
  type?: "dark" | "secondary" | "light" | "primary";
  weight?: "normal" | "strong" | "medium";
};

function Title({
  level = 1,
  type = "dark",
  weight = "strong",
  label,
}: TitleProps) {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        color={
          {
            secondary: "#A5A5A5",
            dark: "#000000",
            light: "#ffffff",
            primary: COLORS.PRIMARY,
          }[type]
        }
        fontWeight={{ medium: 500, strong: 700, normal: 400 }[weight]}
        variant={
          { 1: "h1", 2: "h2", 3: "h3", 4: "h4" }[level] as
            | "h1"
            | "h2"
            | "h3"
            | "h4"
        }
      >
        {label}
      </Typography>
    </ThemeProvider>
  );
}

type LinkProps = {
  weight?: "normal" | "strong" | "medium";
  label: string;
  to?: string;
  size?: "extraSmall" | "small" | "medium" | "large";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "secondary" | "primary" | "dark";
};

function Link({
  weight = "strong",
  label,
}: Omit<LinkProps, "to" | "onClick"> & {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}): React.ReactElement;
function Link({
  weight = "strong",
  label,
}: Omit<LinkProps, "to" | "onClick"> & {
  to: string;
}): React.ReactElement;
function Link({
  weight = "strong",
  to,
  label,
  size = "small",
  onClick,
  type = "primary",
}: LinkProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style) ~ :not(style)": {
            ml: 2,
          },
        }}
        onClick={preventDefault}
      >
        <RouterLink
          to={to || "#"}
          onClick={onClick}
          style={{
            fontWeight: { medium: 500, strong: 700, normal: 400 }[weight],
            color: {
              primary: COLORS.PRIMARY,
              secondary: COLORS.SECONDARY,
              dark: "#000000",
            }[type],
            fontSize: {
              extraSmall: "9px",
              small: "12px",
              medium: "14px",
              large: "16px",
            }[size],
          }}
        >
          {label}
        </RouterLink>
      </Box>
    </ThemeProvider>
  );
}

export { Text, Title, Link };
