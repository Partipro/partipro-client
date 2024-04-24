import * as dayjs from "dayjs";
import { startCase, toLower } from "lodash";
import {
  CancelOutlined,
  EmailOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import Table from "../../../components/data-display/Table.tsx";
import { Link, Text } from "../../../components/data-display/Typography.tsx";
import PropertyContract, {
  PropertyContractStatus,
} from "../../../models/PropertyContract.ts";
import Renter from "../../../models/Renter.ts";
import Property from "../../../models/Property.ts";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import IconButton from "../../../components/inputs/IconButton.tsx";
import useContracts from "../hooks/useContracts.tsx";
import Chip from "../../../components/data-display/Chip.tsx";

function ContractsTable({ contracts }: { contracts: PropertyContract[] }) {
  const [values] = useContracts();

  const handleOpenContract = (document: string) => {
    if (document) {
      window.open(`${import.meta.env.VITE_ASSETS_URL}/${document}`, "_blank");
    }
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
          render: (row) => (
            <Chip
              label={startCase(toLower(row.status))}
              color={
                {
                  [PropertyContractStatus.ACTIVE]: "success",
                  [PropertyContractStatus.DRAFT]: "default",
                  [PropertyContractStatus.AWAITING_SIGN]: "info",
                  [PropertyContractStatus.EXPIRED]: "warning",
                  [PropertyContractStatus.CANCELED]: "error",
                }[row.status] as
                  | "success"
                  | "info"
                  | "warning"
                  | "error"
                  | "default"
              }
            />
          ),
        },
        {
          title: "Locatário",
          key: "locatario",
          render: (row) => (row.renter as Renter)?.name,
        },
        {
          title: "Propriedade",
          key: "property",
          render: (row) => (row.property as Property)?.name,
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
            <FlexRow sx={{ gap: "10px" }} justified>
              <IconButton
                size="small"
                icon={<PictureAsPdfOutlined />}
                onClick={() => handleOpenContract(row.document)}
              />
              {row.status !== PropertyContractStatus.CANCELED && (
                <IconButton
                  icon={<CancelOutlined />}
                  size="small"
                  onClick={() => values?.handleCancelContract(row._id)}
                />
              )}
              {row.status === PropertyContractStatus.DRAFT && (
                <>
                  <IconButton
                    icon={<EmailOutlined />}
                    size="small"
                    onClick={() => values?.handleSendContract(row)}
                  />
                </>
              )}
            </FlexRow>
          ),
        },
      ]}
    />
  );
}

export default ContractsTable;
