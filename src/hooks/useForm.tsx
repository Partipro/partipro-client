import { useFormik } from "formik";

type Props<D> = {
  initialValues: D;
  validate?: (values: D) => { [key: string]: string } | undefined;
  onSubmit: (values: D) => void | Promise<any>;
};

function useForm<D extends object>({
  initialValues,
  validate,
  onSubmit,
}: Props<D>) {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return [formik];
}

export default useForm;
