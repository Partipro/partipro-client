import React from "react";
import MuiAvatar from "@mui/material/Avatar";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

type Props = {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  onClick?: (element: React.MouseEvent<HTMLElement>) => void;
  clickable?: boolean;
};

function Avatar({ src, size = "medium", clickable = false, ...props }: Props) {
  if (!src) {
    return (
      <MuiAvatar
        sx={Object.assign(
          {
            small: { width: 24, height: 24 },
            medium: { width: 32, height: 32 },
            large: { width: 56, height: 56 },
          }[size],
          clickable
            ? {
                cursor: "pointer",
              }
            : {},
        )}
        {...props}
      >
        <PermIdentityOutlinedIcon />
      </MuiAvatar>
    );
  }
  return (
    <MuiAvatar
      sx={Object.assign(
        {
          small: { width: 24, height: 24 },
          medium: { width: 32, height: 32 },
          large: { width: 56, height: 56 },
        }[size],
        clickable
          ? {
              cursor: "pointer",
            }
          : {},
      )}
      {...props}
    />
  );
}

export default Avatar;
