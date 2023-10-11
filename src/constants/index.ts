import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const COLORS = {
  PRIMARY: "#0a5694",
};

const MENUS = [
  {
    label: "Contratos",
    value: "contracts",
    Icon: DescriptionOutlinedIcon,
  },
  {
    label: "Imóveis",
    value: "properties",
    Icon: HomeWorkOutlinedIcon,
  },
  {
    label: "Financeiro",
    value: "finances",
    Icon: AttachMoneyOutlinedIcon,
  },
  {
    label: "Simuladores",
    value: "simulators",
    Icon: CalculateOutlinedIcon,
  },
];

export { COLORS, MENUS };
