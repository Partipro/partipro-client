import { ReactNode } from "react";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";

type Props = {
  label?: string;
  name: string;
  data: { value: any; label: string }[];
  fullWidth?: boolean;
  value: any;
  onChange?: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  error?: boolean;
  helperText?: string;
};

function Select({ data, label, ...props }: Props) {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <MuiSelect fullWidth variant="standard" {...props}>
        {data.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            {d.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
