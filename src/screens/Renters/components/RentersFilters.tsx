import Grid from "../../../components/layout/Grid.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import useForm from "../../../hooks/core/useForm.tsx";
import Button from "../../../components/inputs/Button.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";

function RentersFilters({
  onFiltersSubmit,
}: {
  onFiltersSubmit: (data: { criteria: string; business: string }) => void;
}) {
  const [formik] = useForm({
    initialValues: {
      criteria: "",
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
                  name="criteria"
                  label="Nome ou email"
                  value={formik.values.criteria}
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
