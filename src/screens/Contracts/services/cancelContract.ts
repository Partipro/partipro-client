import request from "../../../helpers/request.ts";
import PropertyContract from "../../../models/PropertyContract.ts";

function cancelContract(id: string): Promise<PropertyContract> {
  return request({
    url: `properties-contracts/${id}/cancel`,
    method: "PATCH",
  });
}

export default cancelContract;
