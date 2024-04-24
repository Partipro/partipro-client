import MuiChip from "@mui/material/Chip";

type Props = {
  label: string;
  color: "success" | "primary" | "error" | "info" | "warning" | "default";
};

function Chip(props: Props) {
  return (
    <MuiChip sx={{ height: "24px !important", fontSize: "12px" }} {...props} />
  );
}

export default Chip;
