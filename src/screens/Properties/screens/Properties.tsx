import { Outlet } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";

function Properties() {
  return (
    <FlexColumn>
      <div>Properties</div>
      <Outlet />
    </FlexColumn>
  );
}

export default Properties;
