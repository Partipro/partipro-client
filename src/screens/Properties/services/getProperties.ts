import Property, { PropertyType } from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

type Params = {
  name?: string;
  city?: string;
  type: PropertyType;
};

function getProperties(params: Params): Promise<Property[]> {
  return request({
    url: "properties",
    params,
  });
}

export default getProperties;
