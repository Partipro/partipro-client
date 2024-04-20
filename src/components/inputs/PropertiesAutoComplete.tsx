import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "@mui/material";
import useQuery from "../../hooks/core/useQuery.tsx";
import getProperties from "../../services/property/getProperties.ts";
import TextField from "./TextField.tsx";

type Props = {
  fullWidth?: boolean;
  label?: string;
  value: any;
  error?: boolean;
  helperText?: string;
};

function PropertiesAutoComplete({ label = "Imóvel", ...props }: Props) {
  const [propertyFilter, setPropertyFilter] = useState("");

  const { data: properties, refetch: fetchProperties } = useQuery({
    autoStart: true,
    queryHash: "autoCompleteProperties",
    queryKey: ["params", propertyFilter ? { name: propertyFilter } : {}],
    service: getProperties,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (value: string) => {
    setPropertyFilter(value);
  };
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Autocomplete
        options={(properties || []).map((d) => ({
          label: d.name,
          id: d._id,
        }))}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setPropertyFilter("")}
            name="property"
            label={label}
          />
        )}
        fullWidth
      />
    </FormControl>
  );
}

export default PropertiesAutoComplete;
