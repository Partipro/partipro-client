import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import ContractsTable from "../components/ContractsTable.tsx";

function Contracts() {
  return (
    <FlexColumn sx={{ width: "100%" }}>
      <ContractsTable contracts={[]} />
    </FlexColumn>
  );
}

export default Contracts;
