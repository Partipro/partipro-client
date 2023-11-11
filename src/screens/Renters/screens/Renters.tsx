import { Outlet } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import RentersFilters from "../components/RentersFilters.tsx";
import RentersTable from "../components/RentersTable.tsx";
import useRenters from "../hooks/useRenters.tsx";

function Renters() {
  const { fetchRenters, renters, deleteRenter } = useRenters();

  return (
    <FlexColumn sx={{ width: "100%", gap: "20px" }}>
      <RentersFilters onFiltersSubmit={(data) => fetchRenters?.(data)} />
      <RentersTable
        renters={renters || []}
        onDelete={(row) => deleteRenter?.(row)}
      />
      <Outlet />
    </FlexColumn>
  );
}

export default Renters;
