import Grid from "../../../components/layout/Grid.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import useForm from "../../../hooks/useForm.tsx";
import Button from "../../../components/inputs/Button.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";

function RentersFilters({
  onFiltersSubmit,
}: {
  onFiltersSubmit: (data: { name: string; business: string }) => void;
}) {
  const [formik] = useForm({
    initialValues: {
      name: "",
      business: "",
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
                <TextField
                  name="business"
                  label="Tipo de negócio"
                  value={formik.values.business}
                  onChange={formik.handleChange}
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

export default RentersFilters;
