import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import Grid from "../../../components/layout/Grid.tsx";

function PropertiesForm() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Dialog
      title={params.id ? "Edit Property" : "Create Property"}
      open
      onClose={() => navigate(-1)}
    >
      <form style={{ width: "100%" }}>
        <Grid
          spacing={4}
          items={[
            { item: <TextField name="name" label="Name" value={123} />, xs: 6 },
            {
              item: <TextField name="city" label="Cidade" value={123} />,
              xs: 6,
            },
            {
              item: <TextField name="address" label="Endereço" value={123} />,
              md: 8,
              xs: 12,
            },
            {
              item: (
                <TextField
                  name="squareMeters"
                  label="Metros quadrados"
                  value={123}
                />
              ),
              md: 2,
              xs: 6,
            },
            {
              item: (
                <TextField name="monthRent" label="Aluguel (mês)" value={123} />
              ),
              md: 2,
              xs: 6,
            },
          ]}
        />
      </form>
    </Dialog>
  );
}

export default PropertiesForm;
