import { Outlet, useNavigate } from "react-router-dom";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import Table from "../../../components/data-display/Table.tsx";
import { Link } from "../../../components/data-display/Typography.tsx";
import Button from "../../../components/inputs/Button.tsx";
import useRenters from "../hooks/useRenters.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "../../../components/inputs/IconButton.tsx";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import RentersFilters from "../components/RentersFilters.tsx";

function Renters() {
  const navigate = useNavigate();
  const { renters, deleteRenter } = useRenters();

  return (
    <FlexColumn sx={{ width: "100%", gap: "20px" }}>
      <RentersFilters />
      <Table
        noData={{
          action: <Link to="/renters/new" label="Registrar locatário" />,
        }}
        datasource={renters || []}
        columns={[
          {
            title: "Nome",
            key: "name",
            dataKey: "name",
          },
          {
            title: "Negócio",
            dataKey: "business",
            key: "business",
          },
          {
            key: "actions",
            width: 150,
            title: "Ações",
            render: (row) => (
              <FlexRow sx={{ gap: "10px" }}>
                <Button
                  label="Editar"
                  size="small"
                  onClick={() => navigate(`/renters/${row._id}`)}
                />
                <IconButton
                  type="error"
                  size="small"
                  icon={<DeleteIcon />}
                  onClick={() => deleteRenter(row)}
                />
              </FlexRow>
            ),
          },
        ]}
      />
      <Outlet />
    </FlexColumn>
  );
}

export default Renters;
