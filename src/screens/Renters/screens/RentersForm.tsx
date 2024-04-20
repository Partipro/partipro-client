import { compact } from "lodash";
import { connect } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import Grid from "../../../components/layout/Grid.tsx";
import useForm from "../../../hooks/core/useForm.tsx";
import { required } from "../../../helpers/validations.ts";
import useRenters from "../hooks/useRenters.tsx";

function RentersForm() {
  const { renter, updateRenter, createRenter } = useRenters();

  const params = useParams();
  const navigate = useNavigate();

  const [formik] = useForm({
    initialValues: renter || {
      name: "",
      email: "",
      business: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      let errors: { business?: string; name?: string; email?: string } = {};
      errors.name = required(values.name);
      errors.email = required(values.email);

      if (!compact(Object.values(errors)).length) {
        errors = {};
      }
      return errors;
    },
    onSubmit: (data) => {
      if (params.id) {
        updateRenter?.({ id: params.id, values: data });
      } else {
        createRenter?.(data);
      }
    },
  });

  return (
    <Dialog
      title={params.id ? "Editar locatário" : "Registrar locatário"}
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
                  label="Nome"
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
                <TextField
                  name="email"
                  label="Email"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email ? formik.errors.email : ""}
                />
              ),
              sm: 6,
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
              sm: 6,
              xs: 12,
            },
          ]}
        />
      </form>
    </Dialog>
  );
}

export default connect(RentersForm);
