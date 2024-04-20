import * as dayjs from "dayjs";
import { startCase, toLower } from "lodash";
import { EmailOutlined, PictureAsPdfOutlined } from "@mui/icons-material";
import Table from "../../../components/data-display/Table.tsx";
import { Link, Text } from "../../../components/data-display/Typography.tsx";
import PropertyContract from "../../../models/PropertyContract.ts";
import Renter from "../../../models/Renter.ts";
import Property from "../../../models/Property.ts";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import { useNotification } from "../../../context/NotificationContext.tsx";
import IconButton from "../../../components/inputs/IconButton.tsx";

function ContractsTable({ contracts }: { contracts: PropertyContract[] }) {
  const { dialog } = useNotification();

  const handleOpenContract = (document: string) => {
    if (document) {
      window.open(`${import.meta.env.VITE_ASSETS_URL}/${document}`, "_blank");
    }
  };

  const handleSendContract = (contract: PropertyContract) => {
    dialog({
      saveButton: {
        onClick: () => {
          // TODO chamar service para enviar contrato para o email do inquilino
        },
        label: "Confirmar",
      },
      content: (
        <Text
          label={`Você tem certeza que deseja enviar o contrato para o inquilino? (${
            (contract.renter as Renter).name
          })`}
        />
      ),
      cancelButton: {
        label: "Cancelar",
      },
    });
  };

  return (
    <Table
      noData={{
        action: <Link to="/contracts/new" label="Adicionar contrato" />,
      }}
      datasource={contracts || []}
      columns={[
        {
          title: "Status",
          key: "status",
          render: (row) => startCase(toLower(row.status)),
        },
        {
          title: "Locatário",
          key: "locatario",
          render: (row) => (row.renter as Renter).name,
        },
        {
          title: "Propriedade",
          key: "property",
          render: (row) => (row.property as Property).name,
        },
        {
          title: "Assinado em",
          width: 200,
          key: "signedAt",
          render: (row) => (
            <FlexRow aligned>
              <Text
                label={
                  row.signedAt
                    ? dayjs(row.signedAt).format("DD/MM/YYYY HH:mm")
                    : "-"
                }
              />
            </FlexRow>
          ),
        },
        {
          key: "actions",
          width: 90,
          title: "Ações",
          align: "center",
          render: (row) => (
            <FlexRow sx={{ gap: "10px" }}>
              <IconButton
                size="small"
                icon={<PictureAsPdfOutlined />}
                onClick={() => handleOpenContract(row.document)}
              />
              <IconButton
                icon={<EmailOutlined />}
                size="small"
                onClick={() => handleSendContract(row)}
              />
            </FlexRow>
          ),
        },
      ]}
    />
  );
}

export default ContractsTable;
