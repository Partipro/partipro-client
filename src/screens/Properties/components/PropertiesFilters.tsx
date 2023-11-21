import Grid from "../../../components/layout/Grid.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import useForm from "../../../hooks/core/useForm.tsx";
import Button from "../../../components/inputs/Button.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import { PropertyType } from "../../../models/Property.ts";
import Select from "../../../components/inputs/Select.tsx";

function PropertiesFilters({
  onFiltersSubmit,
}: {
  onFiltersSubmit: (data: { name: string; type?: PropertyType | "" }) => void;
}) {
  const [formik] = useForm({
    initialValues: {
      name: "",
      type: "" as "",
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      onFiltersSubmit(data);
    },
  });
  return (
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
      <FlexRow aligned>
        <Grid
          spacing={4}
          items={[
            {
              item: (
                <TextField
                  name="name"
                  label="Nome"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              ),
              sm: 4,
              xs: 12,
            },
            {
              item: (
                <Select
                  name="type"
                  label="Tipo do imóvel"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  data={[
                    { label: "Comercial", value: PropertyType.COMMERCIAL },
                    { label: "Residencial", value: PropertyType.RESIDENTIAL },
                  ]}
                />
              ),
              sm: 4,
              xs: 12,
            },
          ]}
        />
        <Button label="Procurar" onClick={formik.handleSubmit} />
      </FlexRow>
    </form>
  );
}

export default PropertiesFilters;
