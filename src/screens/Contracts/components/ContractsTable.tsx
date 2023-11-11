import Table from "../../../components/data-display/Table.tsx";
import { Link } from "../../../components/data-display/Typography.tsx";
import PropertyContract from "../../../models/PropertyContract.ts";

function ContractsTable({ contracts }: { contracts: PropertyContract[] }) {
  return (
    <Table
      noData={{
        action: <Link to="/renters/new" label="Registrar locatário" />,
      }}
      datasource={contracts || []}
      columns={[
        {
          title: "Ativo",
          dataKey: "active",
          key: "active",
        },
        {
          title: "Assinado em",
          key: "signedAt",
          dataKey: "signedAt",
        },
        {
          title: "Locatário",
          key: "locatario",
          dataKey: "renter.name" as string,
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
