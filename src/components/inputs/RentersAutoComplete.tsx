import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "@mui/material";
import useQuery from "../../hooks/core/useQuery.tsx";
import TextField from "./TextField.tsx";
import getRenters from "../../services/renter/getRenters.ts";

type Props = {
  fullWidth?: boolean;
  label?: string;
  value: any;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
};

function RentersAutoComplete({
  label = "Inquilino",
  onChange,
  ...props
}: Props) {
  const [renterFilter, setRenterFilter] = useState("");

  const { data: renters, refetch: fetchRenters } = useQuery({
    autoStart: true,
    queryHash: "autoCompleteRenters",
    queryKey: ["params", renterFilter ? { name: renterFilter } : {}],
    service: getRenters,
  });

  useEffect(() => {
    fetchRenters();
  }, []);

  const handleChange = (value: string) => {
    setRenterFilter(value);
  };
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Autocomplete
        options={(renters || []).map((d) => ({
          label: `${d.name} - ${d.email}`,
          id: d._id,
        }))}
        onChange={(_e, value) => onChange(value?.id || "")}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setRenterFilter("")}
            name="renter"
            label={label}
          />
        )}
        fullWidth
      />
    </FormControl>
  );
}

export default RentersAutoComplete;
