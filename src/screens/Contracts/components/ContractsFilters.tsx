import Grid from "../../../components/layout/Grid.tsx";
import useForm from "../../../hooks/core/useForm.tsx";
import Button from "../../../components/inputs/Button.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import Select from "../../../components/inputs/Select.tsx";
import { PropertyContractStatus } from "../../../models/PropertyContract.ts";
import DatePicker from "../../../components/inputs/DatePicker.tsx";

function ContractsFilters({
  onFiltersSubmit,
}: {
  onFiltersSubmit: (data: { status: string; signedAt: string }) => void;
}) {
  const [formik] = useForm({
    initialValues: {} as { status: string; signedAt: string },
    enableReinitialize: true,
    onSubmit: (data) => {
      onFiltersSubmit(data as { status: string; signedAt: string });
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
                <Select
                  name="status"
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  data={[
                    { label: "Todos", value: "" },
                    {
                      label: "Awaiting Sign",
                      value: PropertyContractStatus.AWAITING_SIGN,
                    },
                    { label: "Active", value: PropertyContractStatus.ACTIVE },
                    { label: "Expired", value: PropertyContractStatus.EXPIRED },
                  ]}
                />
              ),
              sm: 4,
              xs: 12,
            },
            {
              item: (
                <DatePicker
                  name="signedAt"
                  label="Signed at"
                  value={formik.values.signedAt}
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

export default ContractsFilters;
