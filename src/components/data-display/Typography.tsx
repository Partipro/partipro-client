import React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

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
  secondary?: boolean;
};

function Text({ size = "medium", secondary, weight = "normal", label }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant={size}
        color={secondary ? "#A5A5A5" : "#000000"}
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
  type?: "dark" | "secondary" | "light";
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
          { secondary: "#A5A5A5", dark: "#000000", light: "#ffffff" }[type]
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

export { Text, Title };
