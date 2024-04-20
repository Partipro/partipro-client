import { compact } from "lodash";
import { connect } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import Grid from "../../../components/layout/Grid.tsx";
import useForm from "../../../hooks/core/useForm.tsx";
import { required } from "../../../helpers/validations.ts";
import FileUpload from "../../../components/inputs/FileUpload.tsx";
import PropertiesAutoComplete from "../../../components/inputs/PropertiesAutoComplete.tsx";
import useContracts from "../hooks/useContracts.tsx";
import RentersAutoComplete from "../../../components/inputs/RentersAutoComplete.tsx";
import { CreatePropertyContractProps } from "../services/postContract.ts";

function ContractsForm() {
  const [values] = useContracts();

  const params = useParams();
  const navigate = useNavigate();

  const [formik] = useForm({
    initialValues:
      values.contract ||
      ({} as { property: string; renter: string; document: string }),
    enableReinitialize: true,
    validate: (values) => {
      let errors: { property?: string; renter?: string; document?: string } =
        {};
      errors.property = required(values.property as string);
      errors.renter = required(values.renter as string);
      errors.document = required(values.document);

      if (!compact(Object.values(errors)).length) {
        errors = {};
      }
      return errors;
    },
    onSubmit: (data) => {
      if (params.id) {
        // values.updateProperty({ id: params.id, values: data });
      } else {
        values.createContract(data as CreatePropertyContractProps);
      }
    },
  });

  return (
    <Dialog
      title={params.id ? "Editar contract" : "Registrar contrato"}
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
                <PropertiesAutoComplete
                  error={
                    formik.touched.property && Boolean(formik.errors.property)
                  }
                  onChange={(value) => formik.setFieldValue("property", value)}
                  value={formik.values.property}
                  helperText={
                    formik.touched.property ? formik.errors.property : ""
                  }
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <RentersAutoComplete
                  error={formik.touched.renter && Boolean(formik.errors.renter)}
                  value={formik.values.renter}
                  onChange={(value) => formik.setFieldValue("renter", value)}
                  helperText={formik.touched.renter ? formik.errors.renter : ""}
                />
              ),
              sm: 6,
              xs: 12,
            },
            {
              item: (
                <FileUpload
                  onChange={(file) => formik.setFieldValue("document", file)}
                  label="Contrato em PDF"
                  name="document"
                  accept="application/pdf"
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

export default connect(ContractsForm);
