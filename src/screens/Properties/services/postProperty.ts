import Property, { PropertyType } from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

type Data = {
  name: string;
  type: PropertyType | "";
  city?: string;
  address?: string;
  squareMeters?: number;
  monthRent?: number;
};

function postProperty(data: Data): Promise<Property> {
  return request({
    method: "post",
    url: "properties",
    data,
  });
}

export default postProperty;
