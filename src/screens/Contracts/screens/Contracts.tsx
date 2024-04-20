import { Outlet } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import ContractsTable from "../components/ContractsTable.tsx";
import useContracts from "../hooks/useContracts.tsx";
import ContractsFilters from "../components/ContractsFilters.tsx";

function Contracts() {
  const [values] = useContracts();
  return (
    <FlexColumn sx={{ width: "100%", gap: "15px" }}>
      <ContractsFilters
        onFiltersSubmit={(data) => values.fetchContracts?.(data)}
      />
      <ContractsTable contracts={values.contracts?.data || []} />
      <Outlet />
    </FlexColumn>
  );
}

export default Contracts;
