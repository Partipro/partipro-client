import Table from "../../../components/data-display/Table.tsx";
import { Link } from "../../../components/data-display/Typography.tsx";
import PropertyContract from "../../../models/PropertyContract.ts";

function ContractsTable({ contracts }: { contracts: PropertyContract[] }) {
  return (
    <Table
      noData={{
        action: <Link to="/contracts/new" label="Adicionar contrato" />,
      }}
      datasource={contracts || []}
      columns={[
        {
          title: "Status",
          dataKey: "status",
          key: "status",
        },
        {
          title: "Locatário",
          key: "locatario",
          dataKey: "renter.name" as string,
        },
        {
          title: "Assinado em",
          key: "signedAt",
          dataKey: "signedAt",
        },
        // {
        //   key: "actions",
        //   width: 150,
        //   title: "Ações",
        //   render: (row) => (
        //     <FlexRow sx={{ gap: "10px" }}>
        //       <Button
        //         label=""
        //         size="small"
        //         onClick={() => navigate(`/renters/${row._id}`)}
        //       />
        //     </FlexRow>
        //   ),
        // },
      ]}
    />
  );
}

export default ContractsTable;
