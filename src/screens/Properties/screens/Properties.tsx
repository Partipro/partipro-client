import { Outlet } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import useQuery from "../../../hooks/useQuery.tsx";
import getProperties from "../services/getProperties.ts";

function Properties() {
  const { data: properties } = useQuery({
    autoStart: true,
    queryKey: ["name", ""],
    service: getProperties,
  });
  return (
    <FlexColumn>
      <div>{properties?.map((property) => <span>{property.name}</span>)}</div>
      <Outlet />
    </FlexColumn>
  );
}

export default Properties;
