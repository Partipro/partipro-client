import Property from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

function deleteProperty(id: string): Promise<Property> {
  return request({
    url: `properties/${id}`,
    method: "delete",
  });
}

export default deleteProperty;
