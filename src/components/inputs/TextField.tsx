import MuiTextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";
import { InputAdornment } from "@mui/material";

type Props = {
  type?: "password" | "email" | "text";
  label?: string;
  name: string;
  fullWidth?: boolean;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  id?: string;
  helperText?: string;
  icon?: React.ReactNode | string;
};

function TextField({ type = "text", icon, ...props }: Props) {
  return (
    <MuiTextField
      type={type}
      fullWidth
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : {}
      }
      variant="standard"
      {...props}
    />
  );
}

export default TextField;
