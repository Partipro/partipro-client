import MuiTextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

type Props = {
  type?: "password" | "email" | "text";
  label?: string;
  name: string;
  fullWidth?: boolean;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
  helperText?: string;
};

function TextField({ type = "text", ...props }: Props) {
  return <MuiTextField type={type} variant="standard" {...props} />;
}

export default TextField;
