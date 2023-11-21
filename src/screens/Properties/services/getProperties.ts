import Property, { PropertyType } from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

export type PropertiesSearchParams = {
  name?: string;
  city?: string;
  type?: PropertyType | "";
};

function getProperties(params: PropertiesSearchParams): Promise<Property[]> {
  return request({
    url: "properties",
    params,
  });
}

export default getProperties;
