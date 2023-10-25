import { useEffect } from "react";
import { compact } from "lodash";
import { connect } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import Grid from "../../../components/layout/Grid.tsx";
import useMutation from "../../../hooks/useMutation.tsx";
import postProperty from "../services/postProperty.ts";
import useForm from "../../../hooks/useForm.tsx";
import { required } from "../../../helpers/validations.ts";
import Select from "../../../components/inputs/Select.tsx";
import { PropertyType } from "../../../models/Property.ts";
import useQuery from "../../../hooks/useQuery.tsx";
import getPropertyById from "../services/getPropertyById.ts";
import FileUpload from "../../../components/inputs/FileUpload.tsx";
import updateProperty from "../services/updateProperty.ts";
import { useNotification } from "../../../context/NotificationContext.tsx";

function PropertiesForm() {
  const { notification } = useNotification();

  const params = useParams();
  const navigate = useNavigate();

  const { data: property, refetch: fetchById } = useQuery({
    autoStart: false,
    queryKey: ["id", params.id],
    service: getPropertyById,
  });

  const [doCreate] = useMutation({
    service: postProperty,
    onSuccess: () => {
      notification({
        message: "Propriedade registrada com sucesso",
        type: "success",
      });
      navigate(-1);
    },
  });

  const [doUpdate] = useMutation({
    service: updateProperty,
    onSuccess: () => {
      notification({
        message: "Propriedade atualizada com sucesso",
        type: "success",
      });
      navigate(-1);
    },
  });

  const [formik] = useForm({
    initialValues: property || {
      name: "",
      type: PropertyType.COMMERCIAL,
      address: "",
      city: "",
      monthRent: 0,
      squareMeters: 0,
      image: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      let errors: { type?: string; name?: string } = {};
      errors.name = required(values.name);
      errors.type = required(values.type);

      if (!compact(Object.values(errors)).length) {
        errors = {};
      }
      return errors;
    },
    onSubmit: (data) => {
      if (params.id) {
        doUpdate.mutate({ id: params.id, data });
      } else {
        doCreate.mutate(data);
      }
    },
  });

  useEffect(() => {
    if (params.id) {
      fetchById({ queryKey: ["id", params.id] });
    }
  }, [params.id]);

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
            {
              item: (
                <FileUpload
                  onChange={(file) => formik.setFieldValue("image", file)}
                  name="image"
                />
              ),
              xs: 12,
            },
          ]}
        />
      </form>
    </Dialog>
  );
}

export default connect(PropertiesForm);
