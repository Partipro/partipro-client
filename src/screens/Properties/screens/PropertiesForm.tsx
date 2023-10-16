import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import Grid from "../../../components/layout/Grid.tsx";
import useMutation from "../../../hooks/useMutation.tsx";
import postProperty from "../services/postProperty.ts";
import useForm from "../../../hooks/useForm.tsx";
import { required } from "../../../helpers/validations.ts";
import { compact } from "lodash";
import Select from "../../../components/inputs/Select.tsx";
import { PropertyType } from "../../../models/Property.ts";

function PropertiesForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [doCreate] = useMutation({
    service: postProperty,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const [formik] = useForm({
    initialValues: {
      name: "",
      type: "",
      address: "",
      city: "",
      monthRent: 0,
      squareMeters: 0,
    },
    validate: (values) => {
      let errors: { type?: string; name?: string } = {};
      errors.name = required(values.name);
      errors.type = required(values.type);

      if (!compact(Object.values(errors)).length) {
        errors = {};
      }
      return errors;
    },
    onSubmit: doCreate.mutate,
  });

  return (
    <Dialog
      title={params.id ? "Editar imóvel" : "Registrar imóvel"}
      open
      onClose={() => navigate(-1)}
      saveButton={{
        onClick: () => formik.submitForm(),
      }}
    >
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <Grid
          spacing={4}
          items={[
            {
              item: (
                <TextField
                  name="name"
                  label="Identificação"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  helperText={formik.touched.name ? formik.errors.name : ""}
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <Select
                  name="type"
                  label="Tipo do imóvel"
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  data={[
                    { label: "Comercial", value: PropertyType.COMMERCIAL },
                    { label: "Residencial", value: PropertyType.RESIDENTIAL },
                  ]}
                  helperText={formik.touched.type ? formik.errors.type : ""}
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <TextField
                  name="city"
                  label="Cidade"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <TextField
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  label="Endereço"
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <TextField
                  name="squareMeters"
                  label="Metros quadrados"
                  value={formik.values.squareMeters}
                  onChange={formik.handleChange}
                />
              ),
              xs: 6,
            },
            {
              item: (
                <TextField
                  name="monthRent"
                  icon="R$ "
                  label="Aluguel (mês)"
                  value={formik.values.monthRent}
                  onChange={formik.handleChange}
                />
              ),
              xs: 6,
            },
          ]}
        />
      </form>
    </Dialog>
  );
}

export default PropertiesForm;
