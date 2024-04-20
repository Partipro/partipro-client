import { useFormik } from "formik";

type Props<D> = {
  initialValues?: D;
  validate?: (values: D) => { [key: string]: string } | undefined;
  onSubmit: (values: D) => void | Promise<any>;
  enableReinitialize?: boolean;
};

function useForm<D extends object>({
  initialValues,
  validate,
  onSubmit,
  enableReinitialize = false,
}: Props<D>) {
  const formik = useFormik({
    initialValues: initialValues || ({} as D),
    validate,
    enableReinitialize,
    onSubmit,
  });

  return [formik];
}

export default useForm;
