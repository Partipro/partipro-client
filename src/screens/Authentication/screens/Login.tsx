import { useState } from "react";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import login from "../services/login.ts";
import useMutation from "../../../hooks/useMutation.tsx";
import Stack from "../../../components/layout/Stack.tsx";
import Button from "../../../components/inputs/Button.tsx";
import TextField from "../../../components/inputs/TextField.tsx";
import useForm from "../../../hooks/useForm.tsx";
import { required, validateEmail } from "../../../helpers/validations.ts";
import { compact } from "lodash";
import Snackbar from "../../../components/feedback/Snackbar.tsx";
import AuthenticationWrapper from "../components/AuthenticationWrapper.tsx";
import { Title } from "../../../components/data-display/Typography.tsx";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import { useAuth } from "../../../context/AuthContext.tsx";

const SNACKBAR_INITIAL_STATE: {
  isOpen: boolean;
  message: string;
  type: "error" | "success";
} = {
  isOpen: false,
  message: "",
  type: "error",
};

function Login() {
  const { handleFetchUser } = useAuth();

  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);

  const [doLogin] = useMutation({
    service: login,
    onSuccess: () => {
      handleFetchUser();
    },
    onError: (error) => {
      setSnackbar({
        type: "error",
        isOpen: true,
        message: error?.message || "Erro ao efetuar o login",
      });
    },
  });

  const [formik] = useForm({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      let errors: { email?: string; password?: string } = {};
      errors.email = validateEmail(values.email);
      errors.password = required(values.password);

      if (!compact(Object.values(errors)).length) {
        errors = {};
      }
      return errors;
    },
    onSubmit: doLogin.mutate,
  });

  return (
    <AuthenticationWrapper>
      <FlexColumn
        sx={{
          width: "100%",
          maxWidth: "500px",
          minWidth: "250px",
        }}
      >
        <FlexColumn sx={{ marginBottom: "40px" }}>
          <Title label="Entre na sua conta" level={1} />
          <Title
            secondary
            label="preencha seus dados"
            weight="normal"
            level={4}
          />
        </FlexColumn>
        <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              type="email"
              label="Email"
              icon={<EmailOutlined />}
              helperText={formik.touched.email ? formik.errors.email : ""}
            />
            <TextField
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              icon={<LockOutlined />}
              type="password"
              helperText={formik.touched.password ? formik.errors.password : ""}
              label="Password"
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <Button label="Entrar" htmlType="submit" />
          </Stack>
        </form>
      </FlexColumn>
      <Snackbar
        type={snackbar.type}
        open={snackbar.isOpen}
        message={snackbar.message}
      />
    </AuthenticationWrapper>
  );
}

export default Login;
