import Property from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

function getPropertyById(id: string): Promise<Property> {
  return request({
    url: `properties/${id}`,
  });
}

export default getPropertyById;
