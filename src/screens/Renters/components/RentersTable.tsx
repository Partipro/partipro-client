import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/data-display/Table.tsx";
import { Link } from "../../../components/data-display/Typography.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import Button from "../../../components/inputs/Button.tsx";
import IconButton from "../../../components/inputs/IconButton.tsx";
import Renter from "../../../models/Renter.ts";

function RentersTable({
  renters,
  onDelete,
}: {
  renters: Renter[];
  onDelete: (row: Renter) => void;
}) {
  const navigate = useNavigate();
  return (
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
          title: "Email",
          key: "email",
          dataKey: "email",
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
            <FlexRow sx={{ gap: "10px", alignItems: "center" }}>
              <Button
                label="Editar"
                size="small"
                onClick={() => navigate(`/renters/${row._id}`)}
              />
              <IconButton
                type="error"
                size="small"
                icon={<DeleteIcon />}
                onClick={() => onDelete(row)}
              />
            </FlexRow>
          ),
        },
      ]}
    />
  );
}

export default RentersTable;
