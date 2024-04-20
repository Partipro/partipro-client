import { default as Dayjs } from "dayjs";
import { FormControl } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  label?: string;
  name: string;
  fullWidth?: boolean;
  value: any;
  onChange?: (value: Dayjs.Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
};

function DatePicker(props: Props) {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <MuiDatePicker {...props} />
        </DemoContainer>
      </LocalizationProvider>
    </FormControl>
  );
}

export default DatePicker;
